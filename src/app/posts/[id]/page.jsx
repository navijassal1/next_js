
export default async function GreetWithParams({params}) {
    const {id}=await params

    return (<div className="h-100 bg-red-400 flex justify-center items-center
    ">
        <h1 className="text-7xl text-white-700">Greeting with params: {id}</h1>
    </div>)
}