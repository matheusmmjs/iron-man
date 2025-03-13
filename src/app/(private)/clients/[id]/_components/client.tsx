export async function ClientInfo({
    id
}: {
    id: string;
}) {
    await new Promise(resolve => setTimeout(resolve, 4000));

    const response = await fetch(`https://dummyjson.com/users/${id}`);
    const data = await response.json();

    console.log(data);

    return (
        <div>
            <h1>Client Info</h1>
            <p>{data.title}</p>
            <p>{data.body}</p>
        </div>
    )
}