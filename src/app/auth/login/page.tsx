"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/theme/components/Input";
import { enToFaDigits, faToEnDigits } from "@/lib/faToDigits";
import { REGEXP_ONLY_DIGITS } from "input-otp";

type loginForm = {
  otp: string;
  phoneNumber: number;
};

interface InputFieldsProps {
  contentType: "otp" | "phoneNumber";
}
const InputFields = ({ contentType }: InputFieldsProps) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();
  if (contentType === "phoneNumber") {
    return (
      <Input
        variant={!!errors?.phoneNumber ? "error" : "primary"}
        className="width-full"
        {...register("phoneNumber", {
          required: "شماره تلفن اجباری است!",
          validate: (value: number) => {
            const en = faToEnDigits(String(value));
            return (
              /^09\d{9}$/.test(en) || "شماره باید با 09 شروع شده و 11 رقم باشد"
            );
          },
        })}
        onInput={(e) => {
          const input = e.target as HTMLInputElement;
          input.value = enToFaDigits(input.value);
        }}
      />
    );
  }
  console.log({ watch });

  return (
    <div className="w-full">
      <InputOTP
        maxLength={6}
        pattern={REGEXP_ONLY_DIGITS}
        {...register("otp", {
          required: "کد الزامی است",
          validate: (value) =>
            /^\d{6}$/.test(value) || "کد باید شامل ۶ رقم باشد",
        })}
        // value={}
        onChange={(val) => setValue("otp", val, { shouldValidate: true })}
      >
        <InputOTPGroup dir="ltr" className="flex justify-between w-full">
          <InputOTPSlot
            className="border-[1px] !rounded-[5px] border-[#DDDDDD]"
            index={0}
          />
          <InputOTPSlot
            className="border-[1px] !rounded-[5px] border-[#DDDDDD]"
            index={1}
          />
          <InputOTPSlot
            className="border-[1px] !rounded-[5px] border-[#DDDDDD]"
            index={2}
          />
          <InputOTPSlot
            className="border-[1px] !rounded-[5px] border-[#DDDDDD]"
            index={3}
          />
          <InputOTPSlot
            className="border-[1px] !rounded-[5px] border-[#DDDDDD]"
            index={4}
          />
          <InputOTPSlot
            className="border-[1px] !rounded-[5px] border-[#DDDDDD]"
            index={5}
          />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
};

const Login = () => {
  const methods = useForm<loginForm>({ mode: "all" });

  const [contentState, setContentState] = useState<"phoneNumber" | "otp">(
    "phoneNumber"
  );
  const handleClick = (value: loginForm) => {
    if (contentState === "phoneNumber") {
      setContentState("otp");
    } else {
    }
  };

  const cta = useMemo(
    () => ({
      phoneNumber: (
        <button
          type="submit"
          disabled={!!methods?.formState?.errors.phoneNumber}
          className={`btn w-full ${
            !!methods?.formState?.errors?.phoneNumber
              ? "btn-error"
              : "btn-primary"
          }`}
        >
          دریافت کد
        </button>
      ),
      otp: (
        <button type="submit" className="btn  btn-primary w-full">
          ورود
        </button>
      ),
    }),
    [methods?.formState?.errors?.phoneNumber, methods?.formState?.errors?.otp]
  );

  return (
    <div className="flex flex-col pt-[133px] items-center w-full">
      <Image
        src="/icons/72.png"
        alt="logo"
        width={72}
        height={72}
        className="rounded-full"
      />
      <p className="mt-[20px] text-center text-[#191A1A] font-bold text-[24px]">
        برای ادامه، لطفاً وارد حساب کاربری خودت شو.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(methods.formState.errors);

          methods.handleSubmit((values) => {
            handleClick(values);
          })();
        }}
        className="mt-[80px] w-full"
      >
        <FormProvider {...methods}>
          <InputFields contentType={contentState} />
          {!!methods.formState.errors && (
            <p className="text-[12px] text-red-500 mt-[8px]">
              {methods.formState.errors.phoneNumber?.message ??
                methods.formState.errors.otp?.message}
            </p>
          )}
        </FormProvider>
        <div className="mt-[32px] w-full">{cta[contentState]}</div>
      </form>
    </div>
  );
};

export default Login;
