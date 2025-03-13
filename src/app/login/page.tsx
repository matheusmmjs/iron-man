import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function Login() {

async function handleFetchLogin(formData: FormData) {
    "use server";

    console.log("formData:", formData);

    const cpf = formData.get("cpf")?.toString();
    const password = formData.get("password")?.toString();

    // const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         cpf,
    //         password
    //     })
    // });

    // const data = await response.json();
    // console.log(data);    
}

return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Login
        </h1>
        
        <form action={handleFetchLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
            <div className="mb-4">
                <Input 
                    type="text" 
                    placeholder="CPF"
                    name="cpf"
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            
            <div className="mb-6">
                <Input 
                    type="password" 
                    placeholder="Senha"
                    name="password"
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            <Button type="submit" className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Entrar
            </Button>
        </form>
    </div>
);
}