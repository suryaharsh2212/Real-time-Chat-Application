import { useEffect, useRef, useState } from 'react';
import UseGetUsers from '../Utility/UseGetUser';
import { UseSendMessage } from '../Utility/UseSendmessage';
import { UsegetConversation } from '../Utility/UsegetConversation';
import UseCurrentUser from '../Utility/UsecurrentUser';
import { useNavigate, useParams } from 'react-router-dom';
import UseLogoutUser from '../Utility/Uselogout';
import { UserandomImages } from '../Utility/Usegetimages';
import UseSearchUser from '../Utility/UserSearchuser';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import Ably from 'ably'
import Friendcard from './Friendcard';




function Chatbox() {
  const { id, name } = useParams();
  const [Users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [datamessage, setdatamessage] = useState([]);
  const [checkselected, setCheckselected] = useState(true);
  const messagesEndRef = useRef(null);
  const [loading, setloading] = useState(false)
  const [sentLoading, setsentLoading] = useState(false)
  const [chattingwith, setchattingwith] = useState("Choose a user to begin chatting")
  const ably = new Ably.Realtime('OIeztA.vtaYyw:uGJV4_D5wkf4pihnv8M6TcWiyrjaeQSmL1OrCODpIsc')

  const [Isnewmsg, Setnewmsg] = useState(false)
  const [search, setSearch] = useState('')
  const [searchLoading, setsearchLoading] = useState(false)
  const [userLoading, setuserLoading] = useState(false)
  const navigate = useNavigate()
  const [new_msgFrom, setNewmsg] = useState('')


  const handleMessageChange = async () => {
    setsentLoading(true)
    setMessage(message);
    await UseSendMessage(message, id, receiverId);
    setdatamessage(prevMessages => [...prevMessages, { message, user: id }]);
    const conversation = await UsegetConversation(id, receiverId._id);
    setdatamessage(conversation.data.messages || []);
    setsentLoading(false)
    setMessage('');


  };
  useEffect(() => {
    const channel = ably.channels.get(`${id}`)
    channel.subscribe("new-message", (msg) => {
      Setnewmsg(true);
      const rec = msg.data.text
      setdatamessage(prevMessages => [...prevMessages, { message: rec, user: msg.data.senderId }]);
    })
    const newMSg = async () => {
      const result = UseCurrentUser(receiverId);
      console.log("Message received from -", result);
      setNewmsg(result)
    }
    newMSg()

    return () => {
      channel.unsubscribe()

    };
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setuserLoading(true)
        const allUsers = await UseGetUsers(id, receiverId);
        setUsers(allUsers.data);
        setuserLoading(false)
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [id, receiverId]);

  useEffect(() => {
    const fetchdata = async () => {
      setloading(true)
      const conversation = await UsegetConversation(id, receiverId._id);
      setdatamessage(conversation.data.messages || []);
      setloading(false)
    };
    fetchdata();
  }, [receiverId._id, id]);

  const passdata = async (data) => {
    setReceiverId(data);
    setCheckselected(false);
    Setnewmsg(false);
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [datamessage]);

  useEffect(() => {
    if (receiverId) {
      const fetchReceiverName = async () => {
        const result = await UseCurrentUser(receiverId);
        setchattingwith(result);
      };
      fetchReceiverName();
    }
  }, [receiverId]);
  const logout = () => {
    const log = UseLogoutUser()
    if (log) {

      navigate("/login")
    }
    else {
      alert("error")
    }
  }

  const searchUser = async (name) => {
    setsearchLoading(true)
    const searchResult = await UseSearchUser(name)

    if (searchResult.status) {
      toast.success(`${searchResult.message}`, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setUsers(prevUsers => [searchResult.data, ...prevUsers]);
      setsearchLoading(false)
    }
    else {
      toast.error(` ${searchResult.message}`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setsearchLoading(false)
    }
  }



  return (
    <div className='bg-whitesmoke'>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className='md:grid md:grid-cols-7 p-5 h-screen'>
        <button className="btn md:hidden fixed top-4 right-4 h-10" onClick={() => document.getElementById('my_modal_3').showModal()}>Show Chats</button>


        {/* Modal for mobile screens */}
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>

            <div className='overflow-y-scroll h-[100%] relative'>
              <h1 className='w-full btn top-0 mb-5 flex justify-center text-white' style={{ backgroundImage: "linear-gradient(#0018A8,#1C39BB)" }}>Welcome, {name}</h1>
              <div className="pt-2 relative mx-auto text-gray-600 mb-5 p-2">
                <input value={search} autoComplete='off' onChange={(e) => { setSearch(e.target.value) }} className="border-2 border-gray-300 bg-white w-full h-10 px-5 pr-16 rounded-lg text-sm outline-orange-600 focus:outline-none"
                  type="search" name="search" placeholder="Search" />
                <button type="submit" onClick={() => searchUser(search)} className="absolute right-0 top-0 mr-5 mt-5">
                  {searchLoading
                    ?
                    <span className="loading loading-spinner loading-md"></span>
                    :
                    <img className='h-5 w-5' src="https://cdn-icons-png.flaticon.com/128/11741/11741045.png" alt="" />}
                </button>
              </div>

              {userLoading
                ?
                <div className="flex flex-col mt-10 gap-4 w-80">
                  <h1 className='ml-5 font-light'>Loading your Chats......</h1>
                  <div className="skeleton h-32 w-full"></div>
                  <div className="skeleton h-6 w-full"></div>
                  <div className="skeleton h-6 w-full"></div>
                  <div className="skeleton h-6 w-full"></div>
                </div>
                :
                <div>
                  {Users.map((element, index) => (
                    <button key={index} onClick={() => { passdata(element); document.getElementById('my_modal_3').close(); }} className="w-full btn text-white mb-5 h-fit grid grid-cols-1 sm:grid-cols-5 gap-4 p-3 hover:bg-zinc-300" style={{ backgroundImage: "linear-gradient(transparent,transparent)" }}>

                      <div className="avatar online ml-6">
                        <div className="w-10 h-10 rounded-full">
                          <img src={`${UserandomImages()}`} alt="avatar" />
                        </div>
                      </div>
                      <div className='ml-10 text-gray-700 col-span-3 chat chat-start'>
                        {element.fullname}
                      </div>
                    </button>
                  ))}
                </div>
              }
            </div>
          </div>
        </dialog>

        {/* User section for larger screens */}
        <div className='hidden md:block md:col-span-2 p-4 overflow-y-scroll h-[100%] relative -top-4' style={{ scrollbarWidth: '5px', scrollbarColor: 'whitesmoke transparent', borderRadius: '15px' }}>
          <h1 className='w-full btn top-0 mb-5 flex justify-center text-white' style={{ backgroundImage: "linear-gradient(#0018A8,#1C39BB)" }}>Welcome, {name}</h1>
          <div className="pt-2 relative mx-auto text-gray-600 mb-5 p-2">
            <input value={search} autoComplete='off' onChange={(e) => { setSearch(e.target.value) }} className="border-2 border-gray-300 bg-white w-full h-10 px-5 pr-16 rounded-lg text-sm outline-orange-600 focus:outline-none"
              type="search" name="search" placeholder="Search" />
            <button type="submit" onClick={() => searchUser(search)} className="absolute right-0 top-0 mr-5 mt-5">
              {searchLoading
                ?
                <span className="loading loading-spinner loading-md"></span>
                :
                <img className='h-5 w-5' src="https://cdn-icons-png.flaticon.com/128/11741/11741045.png" alt="" />}
            </button>
          </div>

          {userLoading
            ?
            <div className="flex flex-col mt-10 gap-4 w-80">
              <h1 className='ml-5 font-light'>Loading your Chats......</h1>
              <div className="skeleton h-32 w-full"></div>
              <div className="skeleton h-6 w-full"></div>
              <div className="skeleton h-6 w-full"></div>
              <div className="skeleton h-6 w-full"></div>
            </div>
            :
            <div>
              {Users.map((element, index) => (
                <button key={index} onClick={() => { { passdata(element) } }} className="w-full btn text-white mb-5 h-fit grid grid-cols-1 sm:grid-cols-5 gap-4 p-3 hover:bg-zinc-300" style={{ backgroundImage: "linear-gradient(transparent,transparent)" }}>
                  <div className="avatar online ml-6">
                    <div className="w-10 h-10 rounded-full">
                      <img src={`${UserandomImages()}`} alt="avatar" />
                    </div>
                  </div>
                  <div className='ml-10 text-gray-700 col-span-3 chat chat-start'>
                    {element.fullname}
                  </div>
                </button>
              ))}
            </div>
          }
        </div>

        <div className='col-span-5 md:h-[95%] flex flex-col'>
          <div className='flex flex-row justify-start items-start'>
            <h1 className='ml-5 btn p-5' style={{ width: "90%", backgroundImage: "linear-gradient(#0018A8,#1C39BB)" }}>
              {loading ?
                <div className='flex'>
                  <h1 className='font-thin text-white'>Loading chats......</h1>
                  <div className='flex justify-center items-center mb-10'>
                    <span className="loading loading-spinner loading-md"></span>
                  </div>
                </div>
                :
                <div className='text-white'>
                  To : {chattingwith}
                </div>
              }
            </h1>
            <div data-tip={"Logout"} className='tooltip tooltip-bottom'>
              <button onClick={logout} data-tip="Logout" className='border solid rounded-md hover:bg-slate-200 p-2 ml-3 flex justify-center tooltip-bottom'>
                <img className='h-7 w-7 tooltip-bottom' data-tip="Logout" src="https://cdn-icons-png.flaticon.com/128/16967/16967536.png" alt="" />
              </button>
            </div>
          </div>

          <div className='flex flex-col flex-grow p-3 bg-white-500'>
            <div className='w-full p-3 md:h-[550px] overflow-y-scroll'>
              {checkselected
                ?
                <div className='flex justify-center items-center mt-36'>
                  <div className=''>
                    <h1 className='btn font-light mb-5'>Select a conversation to start........</h1>
                  </div>
                </div>
                :
                <div>
                  {datamessage.map((value, index) => {
                    const alignment = (value.user === id) ? 'chat-end' : 'chat-start';
                    const bubbleColor = (value.user === id) ? 'bg-gray-300 text-black' : 'bg-gray-200 text-black';
                    return (
                      <div key={index}>
                        <div className={`chat ${alignment}`}>
                          <div className={`chat-bubble ${bubbleColor}`}>{value.message}</div>
                        </div>
                      </div>
                    );
                  })}

                  <div ref={messagesEndRef} />
                </div>
              }
            </div>
          </div>

          {/* Input message box */}
          <div className='py-2 px-4  md:bottom-0 ' >
            <div className='flex mb-5'>
              <input
                type="text"
                value={message}
                onChange={(e) => { setMessage(e.target.value) }}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 w-1/2 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
              />
              <button onClick={handleMessageChange} className="ml-2 bg-blue-700 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-md">
                {sentLoading
                  ?
                  <div>
                    <span className="loading loading-spinner loading-md"></span>
                  </div>
                  :
                  <div className='text-md'>Send</div>
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    // Button to open modal for mobile screens

  );
}

export default Chatbox;

