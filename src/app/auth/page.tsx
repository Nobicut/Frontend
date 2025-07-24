import Image from "next/image";
import Link from "next/link";

const Auth = () => {
  return (
    <div className="w-full min-h-screen pb-safe">
      <Image
        src="/images/auth/loginBanner.png"
        className="max-h-[491px] z-[-1] max-w-[460px] mx-auto"
        alt="banner"
        fill
      />
      <div className="flex flex-col h-full items-center justify-center">
        <Image
          src="/icons/72.png"
          alt="logo"
          width={72}
          height={72}
          className="rounded-full"
        />
        <p className="mt-[32px] text-[24px] text-color-[#191A1A] font-bold text-center">
          یه ظاهر تازه، فقط چند کلیک فاصله داره
        </p>
        <p className="text-[#888888] text-[16px] text-center mt-[16px]">
          نوبت کوتاهی موی خود را در چند ثانیه رزرو کنید. برنامه‌ریزی آسان،
          مدیریت سریع، بدون تماس تلفنی.
        </p>
        <Link
          href="/auth/login"
          className="mt-[80px] btn btn-primary w-full h-[60px] text-center flex items-center justify-center"
        >
          ورود/ثبت‌نام
        </Link>
      </div>
    </div>
  );
};

export default Auth;
