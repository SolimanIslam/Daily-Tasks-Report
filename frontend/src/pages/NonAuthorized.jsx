import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

const NonAuthorized = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Access Denied</CardTitle>
          <CardDescription>Permission Required</CardDescription>
        </CardHeader>
        <CardContent>
          <p>You do not have the necessary permissions to view this page.</p>
          <p>Please contact your administrator if you believe this is an error.</p>
        </CardContent>
        <CardFooter>
          {/* <p>&copy; 2024 Salem Ventures</p> */}
          <p>&copy; {new Date().getFullYear()} Salem Ventures</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NonAuthorized;
