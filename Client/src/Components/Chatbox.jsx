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
      toast.error(`${searchResult.message}`, {
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
    <div className=' bg-whitesmoke'>
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
        <div className='md:col-span-2 p-4 overflow-y-scroll h-[100%] relative -top-4' style={{ scrollbarWidth: '5px', scrollbarColor: 'whitesmoke transparent', borderRadius: '15px' }}>
          <h1 className='w-full btn top-0 mb-5 flex justify-center text-white' style={{ backgroundImage: "linear-gradient(#0018A8,#1C39BB)" }}>Welcome, {name}</h1>
          <div className="pt-2 relative mx-auto text-gray-600 mb-5 p-2">
            <input value={search} autoComplete='off' onChange={(e) => { setSearch(e.target.value) }} className="border-2 border-gray-300 bg-white w-full h-10 px-5 pr-16 rounded-lg text-sm outline-orange-600 focus:outline-none"
              type="search" name="search" placeholder="Search" />
            <button type="submit" onClick={() => searchUser(search)} className="absolute right-0 top-0 mr-5 mt-5">
              {searchLoading
                ? <span className="loading loading-spinner loading-md"></span>
                : <img className='h-5 w-5' src="https://cdn-icons-png.flaticon.com/128/11741/11741045.png" alt="" />}
            </button>
          </div>

          {userLoading
            ? <div className="flex flex-col mt-10 gap-4 w-80">
              <h1 className='ml-5 font-light'>Loading your Chats......</h1>
              <div className="skeleton h-32 w-full"></div>
              <div className="skeleton h-6 w-full"></div>
              <div className="skeleton h-6 w-full"></div>
              <div className="skeleton h-6 w-full"></div>
            </div>
            : <>
              {Users.map((element, index) => (
                <button key={index} onClick={() => passdata(element)} className="w-full btn text-white mb-5 h-fit grid grid-cols-1 sm:grid-cols-5 gap-4 p-3 hover:bg-zinc-300" style={{ backgroundImage: "linear-gradient(transparent,transparent)" }}>
                  <div className="avatar online ml-6">
                    <div className="w-10 h-10 rounded-full">
                      <img src={`${UserandomImages()}`} alt="avatar" />
                    </div>
                  </div>
                  <div className='ml-10 text-gray-700 col-span-3 chat chat-start'>
                    {element.fullname}
                  </div>
                  <div className='col-span-1'>
                  </div>
                </button>
              ))}
            </>
          }
        </div>

        <div className='col-span-5 md:h-[95%] flex flex-col'>
          <div className='flex flex-row justify-start items-start'>
            <h1 className='ml-5 btn p-5' style={{ width: "90%", backgroundImage: "linear-gradient(#0018A8,#1C39BB)" }}>
              {loading
                ? <div className='flex'>
                  <h1 className='font-thin text-white'>Loading chats......</h1>
                  <div className='flex justify-center items-center mb-10'>
                    <span className="loading loading-spinner loading-md"></span>
                  </div>
                </div>
                : <h1 className='font-thin text-white'>You are chatting with {chattingwith}</h1>}
            </h1>
            <button onClick={logout} className='btn' style={{ backgroundImage: "linear-gradient(#0018A8,#1C39BB)" }}>
              <img className='h-6 w-6' src="https://cdn-icons-png.flaticon.com/128/6038/6038972.png" alt="" />
            </button>
          </div>

          <div className='h-full overflow-y-scroll p-2'>
            {datamessage.map((value, index) => {
              const task = (value.user == id) ? 'end' : 'start';
              const colour = (value.user == id) ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black';
              return (
                <div key={index}>
                  <div className={`chat chat-${task}`}>
                    <div className={`chat-bubble ${colour}`}>{value.message}</div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <div className='flex justify-center'>
            <input value={message} onChange={(e) => { setMessage(e.target.value) }} autoComplete='off' type="text" placeholder="Type your message here...." className="input input-bordered input-lg w-full md:w-[85%] outline-orange-600" />
            <button onClick={handleMessageChange} className='btn h-14 mt-2' style={{ backgroundImage: "linear-gradient(#0018A8,#1C39BB)" }}>
              {sentLoading
                ? <span className="loading loading-spinner loading-md"></span>
                : <img className='h-6 w-6' src="https://cdn-icons-png.flaticon.com/128/660/660715.png" alt="" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbox;
