'use client'
import Image from "next/image";
import Link from 'next/link';
import "./navbottom.css"

const Navbottom = () => {
    return (
        <>
        <div className="shadowing bg-gray-50 w-screen h-17 fixed bottom-0 left-0 z-99 pb-2 flex justify-around items-center text-black">
        <a href="/">
            <div className='w-max h-max flex flex-col items-center '>
                <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#000000"><path d="M240-200h156v-234h168v234h156v-360L480-742 240-560v360Zm-28 28v-402l268-203 268 203v402H536v-234H424v234H212Zm268-299Z"/></svg>
                <h6>Home</h6>
            </div>
        </a>
        <Link href="/osis">
            <div className='w-max h-max flex flex-col items-center '>
            <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#000000"><path d="M52-262v-26q0-35 38-58.5t97-23.5q8 0 18 1t22 3q-8 15-11.5 30.5T212-305v43H52Zm240 0v-39q0-21.84 13-39.92Q318-359 344-372t60-19.5q34-6.5 75.6-6.5 42.4 0 76.4 6.5 34 6.5 60 19.5t39 31.08q13 18.08 13 39.92v39H292Zm456 0v-42.7q0-17.08-3.5-32.19T734-366q13-2 22.5-3t17.5-1q59 0 96.5 23.5T908-288v26H748Zm-428-28h320v-11q0-31-44-50t-116-19q-72 0-116 19t-44 50v11ZM186.73-407q-20.73 0-35.23-14.69Q137-436.38 137-457q0-20 14.69-34.5T187-506q20 0 35 14.5t15 34.8q0 19.7-14.45 34.7-14.45 15-35.82 15ZM774-407q-20 0-35-15t-15-34.7q0-20.3 15-34.8 15-14.5 35.19-14.5 20.81 0 35.31 14.5Q824-477 824-457q0 20.62-14.37 35.31Q795.25-407 774-407Zm-293.65-21Q448-428 425-450.75T402-506q0-33.15 22.75-55.58Q447.5-584 480-584q33.15 0 55.58 22.32Q558-539.35 558-506.35 558-474 535.68-451q-22.33 23-55.33 23Zm.15-28q20.5 0 35-15t14.5-35.5q0-20.5-14.37-35Q501.25-556 480-556q-20 0-35 14.37-15 14.38-15 35.63 0 20 15 35t35.5 15Zm-.5 166Zm0-216Z"/></svg>
            <h6>OSIS</h6>
            </div>
        </Link>
        <Link href={"/TKA/user"}>
            <div className='w-max h-max flex flex-col items-center '>
            <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#000000"><path d="M488-160q2 8 5.5 15t8.5 13H232q-26 0-43-17t-17-43v-576q0-26 17-43t43-17h416q26 0 43 17t17 43v285q-6-1-14-1t-14 1v-285q0-12-10-22t-22-10H454v238l-74-44-74 44v-238h-74q-12 0-22 10t-10 22v576q0 12 10 22t22 10h256Zm206 52q-62 0-105-43t-43-105q0-62 43-105t105-43q62 0 105 43t43 105q0 62-43 105t-105 43Zm-30-80 94-70-94-70v140ZM306-800h148-148Zm182 0H200h480-214 22Z"/></svg>
            <h6>Berlatih TKA</h6>
            </div>
        </Link>
        <Link href={'/TKA'}>
        
        <div className='w-max h-max flex flex-col items-center '>
            <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#000000"><path d="M252-256q51-36 106.5-57T480-334q66 0 121.5 21T708-256q41-41 66.5-98T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 69 25.5 126t66.5 98Zm228.03-210Q432-466 399-498.97t-33-81Q366-628 398.97-661t81-33Q528-694 561-661.03t33 81Q594-532 561.03-499t-81 33ZM480-132q-73 0-136.5-27T233-233q-47-47-74-110.5T132-480q0-73 27-136.5T233-727q47-47 110.5-74T480-828q73 0 136.5 27T727-727q47 47 74 110.5T828-480q0 73-27 136.5T727-233q-47 47-110.5 74T480-132Zm0-28q56 0 111.5-20.5T686-236q-39-32-91.5-51T480-306q-62 0-115 18.5T274-236q39 35 94.5 55.5T480-160Zm0-334q36 0 61-25t25-61q0-36-25-61t-61-25q-36 0-61 25t-25 61q0 36 25 61t61 25Zm0-86Zm0 347Z"/></svg>
            <h6>Profile</h6>
            </div>

        </Link>
        </div>
        </>
    )
}

export default Navbottom;