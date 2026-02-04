import { MousePointer2 } from "lucide-react";

export function AuthLogo() {
  return (
    <div className="flex flex-col items-center justify-center mb-8">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-3">
        <MousePointer2 className="w-8 h-8 text-primary" />
      </div>
      <h1 className="text-2xl font-bold">Web Cursor</h1>
      <p className="text-sm text-muted-foreground">Secure Authentication</p>
    </div>
  );
}
