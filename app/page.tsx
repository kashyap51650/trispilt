import AuthWrapper from "@/components/AuthWrapper";
import SplashPage from "./(public-routes)/splash/page";

export default function Home() {
  return (
    <AuthWrapper>
      <SplashPage />
    </AuthWrapper>
  );
}
