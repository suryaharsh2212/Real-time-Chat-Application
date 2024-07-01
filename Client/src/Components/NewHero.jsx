import { Link } from "react-router-dom"


function NewHero() {
    return (
        <div>
            <div className='md:h-full' style={{ backgroundImage: "linear-gradient(#62cff4,#2c67f2)" }}>
                {/* header  */}
                <div className='w-full h-20 '  >

                    <div className='grid grid-cols-5 '>
                        <div className='col-span-3 bg-gray-200 p-4 flex justify-start'>
                            <img className='h-7 w-7 ' src="https://cdn-icons-png.flaticon.com/128/9459/9459144.png" alt="" />
                            <h1 className=' ml-2 font-extrabold text-2xl'>Giggle</h1>
                        </div>
                        <div className='col-span-2 bg-gray-200 p-4 md:flex md:justify-end'> <button className=' border border-black p-1 w-32 rounded hover:bg-gray-300  '> <Link to="/login">Login</Link></button></div>
                    </div>

                </div>


                {/* middle */}
                <div className=" md:flex md:flex-row h-1/2 w-full ">
                    <div className="  ml-3  md:w-1/2 flex flex-col justify-center items-center">
                        <h1 className=' font-extrabold md:text-5xl text-3xl  w-96 bg-gradient-to-r font mt-5 from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text animate-gradient bg-300% text-white' >
                            Start chatting with customers anytime with Application

                        </h1>
                        <h1 className=' mt-5 font-medium w-96 text-gray-200'>Your conversations are protected with end-to-end encryption, ensuring privacy and confidentiality.</h1>
                        <div className='w-96 mt-3 flex justify-center md:justify-start mb-20'> <button className=' text white rounded btn'><Link to="/register">Get Started</Link></button></div>
                    </div>


                    <div className=" md:w-1/2  flex justify-center">

                        <div className="mockup-phone scale-x-90 animate-gradient">

                            <div className="camera"></div>
                            <div className="display">
                                <div className="artboard artboard-demo phone-1 p-0" style={{ border: "2px solid red" }}>
                                    <div className="p-2 ">

                                        <div className="chat chat-start">
                                            <div className="chat-bubble chat-bubble-primary">
                                                Hey! How's it going?
                                            </div>
                                        </div>


                                        <div className="chat chat-end mt-10 ">
                                            <div className="chat-bubble bg-white text-black">
                                                Hi there! I'm good, thanks. How about you?
                                            </div>
                                        </div>


                                        <div className="chat chat-start mt-10">
                                            <div className="chat-bubble chat-bubble-primary">
                                                Not bad, just catching up on some work.
                                            </div>
                                        </div>


                                        <div className="chat chat-end mt-10 ">
                                            <div className="chat-bubble bg-white text-black">
                                                That's good. Let me know if you need any help!
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>


                </div>




            </div>
            {/* hero element  */}
            <div className="md:p-10 mt-10 bg-white">
                <div className="hero shadow-sm rounded-2xl hover:bg-whitesmoke md:h-96">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <img
                            src="https://res.cloudinary.com/dllgqcla4/image/upload/v1719601977/kky3kg62s4txou240siw.jpg"
                            className="max-w-sm rounded-lg " />
                        <div>
                            <h1 className="text-5xl font-bold">What is Giggle?</h1>
                            <p className="py-6">
                                Giggle is a dynamic and user-friendly chat application designed to bring people closer through seamless communication. Whether you're connecting with friends, family, or colleagues, Giggle offers a robust platform that prioritizes simplicity and reliability. With intuitive interface features and a wide range of customization options, users can personalize their chat experience to suit their preferences. From instant messaging to group chats and file sharing, Giggle ensures that staying connected is both convenient and enjoyable. Emphasizing security and privacy, Giggle provides a safe environment for users to interact, making it the go-to choice for modern communication needs.
                            </p>

                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full md:h-96 flex flex-col md:flex-row md:p-10 py-10 -mt-10'>
                <div className='h-1/2 md:1/3  p-4'>
                    <div className='bg-whitesmoke rounded-md shadow-lg p-5 hover:outline hover:shadow-xl'>
                        <div className="flex p-2">
                            <img className="h-10 w-10 rounded-full " src="https://cdn-icons-png.flaticon.com/128/4488/4488418.png" alt="error" />
                            <h1 className=' font-extrabold text-sky-400 ml-2 mt-3'>About Giggle</h1>
                        </div>
                        I've created a real-time chat application using WebSockets, allowing users to engage in instant messaging with anyone available to respond. This platform ensures seamless communication, enabling dynamic interactions and timely responses. Whether you're connecting with friends, colleagues, or new acquaintances. available to respond. This platform ensures seamless communication, enabling dynamic interactions and timely responses. Whether you're connecting with friends, or someone special. 
                    </div>
                </div>
                <div className='h-1/2 md:1/3  p-4'>
                    <div className='bg-whitesmoke rounded-md shadow-lg p-5 hover:outline hover:shadow-xl'>
                        <div className="flex p-2">
                            <img className="h-10 w-10 rounded-full " src="https://cdn-icons-png.flaticon.com/128/12449/12449005.png" alt="error" />
                            <h1 className=' font-extrabold text-sky-400 ml-2 mt-3'>Tech Stack</h1>
                        </div>

                       

                        I've developed this project using a powerful tech stack to ensure efficiency and a seamless user experience. The frontend is built with React and Vite, leveraging their speed and flexibility. Tailwind CSS was used for styling, providing a utility-first approach for consistent design.

                        On the backend, Node.js handles server-side logic, while MongoDB with Mongoose manages the database for reliable data storage and retrieval.

                        For version control and collaboration, I've relied on GitHub, and the project is deployed and hosted on Vercel, ensuring smooth deployment and scalability.

                        
                    </div>
                </div>
                <div className='h-1/2 md:1/3  p-4'>
                    <div className='bg-whitesmoke rounded-md shadow-lg p-5 hover:outline hover:shadow-xl'>
                        <div className="flex p-2">
                            <img className="h-10 w-10 rounded-full " src="https://cdn-icons-png.flaticon.com/128/9977/9977254.png" alt="error" />
                            <h1 className=' font-extrabold text-sky-400 ml-2 mt-3'>About me</h1>
                        </div>
                        Hello! I'm Surya Prakash, currently in my 2nd year of B.Tech in Computer Science. I am passionate about full-stack development and dedicated to furthering my skills in this field. Chat UI has become increasingly integral in our daily lives, influencing how we connect and collaborate. As a developer, I am fascinated by the evolving landscape of chat UI design. On this page, I curate a collection of inspiring chat UI designs crafted by talented individuals worldwide.
                    </div>
                </div>
               






            </div>
            <footer className="footer footer-center bg-primary text-primary-content mt-32 p-10">
                <aside>

                    <p className="font-bold">
                        Made By Surya Prakash
                        <br />
                        <h1 className='font-semibold'>suryaraj04266@gmail.com | 7488491434</h1>
                    </p>
                    <p>{new Date().getDate()}/{new Date().getMonth()}/{new Date().getFullYear()} </p>
                </aside>
                <nav>
                    <div className="grid grid-flow-col gap-4">
                        <a>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current">
                                <path
                                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                            </svg>
                        </a>
                        <a>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current">
                                <path
                                    d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                            </svg>
                        </a>
                        <a>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current">
                                <path
                                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                            </svg>
                        </a>
                    </div>
                </nav>
            </footer>

        </div>
    )
}

export default NewHero
