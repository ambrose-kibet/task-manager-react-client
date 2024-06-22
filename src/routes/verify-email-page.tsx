import VerificationForm from "@/components/auth/verify-email-form";

const VerifyEmailPage: React.FC = () => {
  return (
    <div className="min-w-screen flex min-h-screen flex-col items-center justify-center px-2">
      <VerificationForm />
    </div>
  );
};
export default VerifyEmailPage;
