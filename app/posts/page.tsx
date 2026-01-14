import Link from "next/link";

const length = [1, 2, 3, 4]
export default function Hello() {
    return (
        <div className="h-100 bg-amber-100 flex flex-col justify-evenly items-center ">
            <h1 className="text-7xl text-cyan-700">Hello' Navdeep Singh Jassal</h1>
            <div className="bg-red-500 text-white text-2xl h-20 w-100 flex flex-row justify-around items-center
            ">
                {length.map((value, index) => {
                    return <Link className=" hover:text-black"
                        key={index}
                        href={`/posts/${value}`}>
                        Post {value}
                    </Link>
                })}
            </div>
        </div>)
}