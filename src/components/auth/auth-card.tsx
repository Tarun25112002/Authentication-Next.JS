import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  footer?: React.ReactNode;
}

export function AuthCard({
  children,
  title,
  description,
  footer,
}: AuthCardProps) {
  return (
    <Card className="border-0 shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-center">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && (
        <CardFooter className="flex flex-col space-y-4">{footer}</CardFooter>
      )}
    </Card>
  );
}
