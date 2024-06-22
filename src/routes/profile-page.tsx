import UpdateUserForm from "@/components/profile/update-user";
import UpdateUserPasswordForm from "@/components/profile/update-user-password";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ProfilePage: React.FC = () => {
  return (
    <div className="min-w-screen flex min-h-screen flex-col items-center justify-center px-2">
      <Card className="w-full">
        <CardHeader>
          <h1 className="text-center text-2xl font-semibold">
            Update <span className="text-primary">Profile</span>
          </h1>
        </CardHeader>
        <CardContent>
          <UpdateUserForm />
          <UpdateUserPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
};
export default ProfilePage;
