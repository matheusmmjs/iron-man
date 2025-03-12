import { Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "./../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./../ui/avatar";

export function Sales() {
  return (
    <Card className="flex-1">
      <CardHeader>
        <div className="flex items-center justify-center">
          <CardTitle className="text-lg sm:text-xl text-gray-800">
            Aniversariante do mês
          </CardTitle>
          <Users className="ml-auto w-4 h-4" />
        </div>
        <CardDescription>
          Total de aniversariantes do mês atual
        </CardDescription>
      </CardHeader>
  
      <CardContent>

        <article className="flex items-center gap-2 border-b py-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/matheusmmjs.png"/>
            <AvatarFallback>MM</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm sm:text-base font-semibold">Matheus Moreira</p>
            <span className="text-[12px] sm:text-sm text-gray-400">matheus@gmail.com</span>
          </div>
        </article>

        <article className="flex items-center gap-2 border-b py-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/matheusmmjs.png"/>
            <AvatarFallback>MM</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm sm:text-base font-semibold">Matheus Moreira</p>
            <span className="text-[12px] sm:text-sm text-gray-400">matheus@gmail.com</span>
          </div>
        </article>

        <article className="flex items-center gap-2 border-b py-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/matheusmmjs.png"/>
            <AvatarFallback>MM</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm sm:text-base font-semibold">Matheus Moreira</p>
            <span className="text-[12px] sm:text-sm text-gray-400">matheus@gmail.com</span>
          </div>
        </article>

      </CardContent>
    </Card>
  );
}