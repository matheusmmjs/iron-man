import { Suspense } from "react";
import { ClientInfo } from "./_components/client";

export default async function ClientDetails({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <div>
            <h1>Client Details: {id}</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <ClientInfo id={id} />
            </Suspense>
        </div>
  );
}