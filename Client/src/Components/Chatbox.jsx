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
import Ably from 'ably';
import Friendcard from './Friendcard';

function Chatbox() {
  const { id, name } = useParams();
  const [Users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [datamessage, setdatamessage] = useState([]);
  const [checkselected, setCheckselected] = useState(true);
  const messagesEndRef = useRef(null);
  const [loading, setloading] = useState(false);
  const [sentLoading, setsentLoading] = useState(false);
  const [chattingwith, setchattingwith] = useState("Choose a user to begin chatting");
  const ably = new Ably.Realtime('OIeztA.vtaYyw:uGJV4_D5wkf4pihnv8M6TcWiyrjaeQSmL1OrCODpIsc');

  const [Isnewmsg, Setnewmsg] = useState(false);
  const [search, setSearch] = useState('');
  const [searchLoading, setsearchLoading] = useState(false);
  const [userLoading, setuserLoading] = useState(false);
  const navigate = useNavigate();
  const [new_msgFrom, setNewmsg] = useState('');

  const handleMessageChange = async () => {
    setsentLoading(true);
    setMessage(message);
    await UseSendMessage(message, id, receiverId);
    setdatamessage(prevMessages => [...prevMessages, { message, user: id }]);
    const conversation = await UsegetConversation(id, receiverId._id);
    setdatamessage(conversation.data.messages || []);
    setsentLoading(false);
    setMessage('');
  };

  useEffect(() => {
    const channel = ably.channels.get(`${id}`);
    channel.subscribe("new-message", (msg) => {
      Setnewmsg(true);
      const rec = msg.data.text;
      setdatamessage(prevMessages => [...prevMessages, { message: rec, user: msg.data.senderId }]);
    });

    const newMSg = async () => {
      const result = UseCurrentUser(receiverId);
      console.log("Message received from -", result);
      setNewmsg(result);
    };
    newMSg();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setuserLoading(true);
        const allUsers = await UseGetUsers(id, receiverId);
        setUsers(allUsers.data);
        setuserLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [id, receiverId]);

  useEffect(() => {
    const fetchdata = async () => {
      setloading(true);
      const conversation = await UsegetConversation(id, receiverId._id);
      setdatamessage(conversation.data.messages || []);
      setloading(false);
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
    const log = UseLogoutUser();
    if (log) {
      navigate("/login");
    } else {
      alert("error");
    }
  };

  const searchUser = async (name) => {
    setsearchLoading(true);
    const searchResult = await UseSearchUser(name);

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
      setsearchLoading(false);
    } else {
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
      setsearchLoading(false);
    }
  };

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
      <div className='md:grid md:grid-cols-7 p-5 h-screen '>
        <div className='md:col-span-2 p-4 overflow-y-scroll h-[100%]  relative -top-4' style={{ scrollbarWidth: '5px', scrollbarColor: 'whitesmoke transparent', borderRadius: '15px' }} >
          <h1 className='w-full btn top-0 mb-5 flex justify-center  text-white' style={{ backgroundImage: "linear-gradient(#0018A8,#1C39BB)" }}>Welcome, {name}</h1>
          <div className="pt-2 relative mx-auto  text-gray-600  mb-5 p-2" >
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
              <h1 className='ml-5 font-light '> Loading your Chats......</h1>
              <div className="skeleton h-32  w-full"></div>
              <div className="skeleton h-6 w-full"></div>
              <div className="skeleton h-6 w-full"></div>
              <div className="skeleton h-6 w-full"></div>
            </div>
            :
            <>
              {Users.map((element, index) => (
                <button key={index} onClick={() => passdata(element)} className="w-full  btn text-white mb-5  h-fit grid grid-cols-1 sm:grid-cols-5 gap-4 p-3 hover:bg-zinc-300" style={{ backgroundImage: "linear-gradient(transparent,transparent)" }}>
                  <div className="avatar online ml-6 ">
                    <div className="w-10 h-10 rounded-full" >
                      <img src={`${UserandomImages()}`} alt="avatar" />
                    </div>
                  </div>
                  <div className='ml-10 text-gray-700 col-span-3 chat chat-start'>
                    {element.fullname}
                  </div>

                  <div className='col-span-1'>

                    {/* <button className=' hover:btn-circle'><img className='h-10 w-10' src="https://cdn-icons-png.flaticon.com/128/5649/5649794.png" alt="" /></button>  */}



                  </div>
                </button>
              ))}
            </>
          }
          <button className="btn absolute bottom-0 ml-[4%] bg-[#0D5BE1]  hover:bg-[#0018A8] w-[90%] h-[10%]" onClick={logout}>Logout</button>
        </div>
        <div className='md:col-span-5 bg-whitesmoke'>
          <div className='border-black border-opacity-20 border-b-2 p-2 text-lg font-serif  text-black-600 flex justify-center' style={{ color: "#1C39BB" }}><p>Chatting with {chattingwith.fullname} </p> </div>
          {loading
            ?
            <div className='flex flex-col  justify-center items-center gap-4 p-4'>
              <span className="loading loading-ring loading-lg"></span>
              <h1 className='text-sm font-semibold'>Loading Chat...</h1>
            </div>
            :
            <div className='h-[75vh] overflow-y-scroll p-10'>
              <div className="chat-body">
                {datamessage.length > 0 ? (
                  datamessage.map((messageObj, index) => (
                    <div
                      key={index}
                      className={`chat ${messageObj.user === id ? 'chat-end' : 'chat-start'}`}
                    >
                      <div
                        className={`chat-bubble ${messageObj.user === id ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'}`}
                      >
                        {messageObj.message}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className='text-center text-gray-500'>No messages yet. Start the conversation!</p>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          }
          <div className="p-4">
            <div className="input-group">
              <input
                type="text"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="input input-bordered w-full"
              />
              <button className="btn btn-primary" onClick={handleMessageChange} disabled={!message || sentLoading}>
                {sentLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  'Send'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbox;
