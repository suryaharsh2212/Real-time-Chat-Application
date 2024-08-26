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

function NewChatbox() {
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
    <div className="flex flex-col h-screen">
      <div className="container mx-auto shadow-lg rounded-lg flex-1 overflow-hidden">
        {/* header */}
        <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
          <div className="font-semibold text-2xl">GoingChat</div>
          <div className="w-1/2 hidden md:block">
            <input
              type="text"
              placeholder="search IRL"
              className="rounded-2xl bg-gray-100 py-3 px-5 w-full"
            />
          </div>
          <button
            className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center md:hidden"
            onClick={() => document.getElementById('my_modal_3').showModal()}
          >
            Users
          </button>
        </div>
        {/* end header */}
        
        <div className="flex flex-col md:flex-row flex-1">
          {/* chat list */}
          <div className="flex flex-col w-full md:w-2/5 border-r-2 overflow-y-auto">
            {/* search component */}
            <div className="border-b-2 py-4 px-2 md:hidden">
              <input
                type="text"
                placeholder="search chatting"
                className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
              />
            </div>
            {/* end search component */}
            {/* user list */}
            {Users.map((user) => (
              <div
                key={user.index}
                className={`flex flex-row py-4 px-2 items-center border-b-2 ${receiverId === user.id ? 'border-l-4 border-blue-400' : ''}`}
                onClick={() => passdata(user.id)}
              >
                <div className="w-1/4">
                  <img
                    src={UserandomImages[user.id] || "https://source.unsplash.com/600x600"}
                    className="object-cover h-12 w-12 rounded-full"
                    alt={user.name}
                  />
                </div>
                <div className="w-full">
                  <div className="text-lg font-semibold">{user.name}</div>
                  <span className="text-gray-500">{user.lastMessage}</span>
                </div>
              </div>
            ))}
            {/* end user list */}
          </div>
          {/* end chat list */}
          
          {/* message */}
          <div className="flex-1 px-5 flex flex-col">
            <div className="flex flex-col mt-5 overflow-auto">
              {datamessage.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.user === id ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  {msg.user !== id && (
                    <img
                      src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                      className="object-cover h-8 w-8 rounded-full"
                      alt=""
                    />
                  )}
                  <div
                    className={`py-3 px-4 ${msg.user === id ? 'bg-blue-400 text-white rounded-bl-3xl rounded-tl-3xl rounded-tr-xl' : 'bg-gray-400 text-white rounded-br-3xl rounded-tr-3xl rounded-tl-xl'}`}
                  >
                    {msg.message}
                  </div>
                  {msg.user === id && (
                    <img
                      src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                      className="object-cover h-8 w-8 rounded-full"
                      alt=""
                    />
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="py-5">
              <input
                className="w-full bg-gray-300 py-5 px-3 rounded-xl"
                type="text"
                placeholder="type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleMessageChange();
                }}
              />
            </div>
          </div>
          {/* end message */}
          
          <div className="w-full md:w-2/5 border-l-2 px-5 hidden md:block">
            <div className="flex flex-col">
              <div className="font-semibold text-xl py-4">Mern Stack Group</div>
              <img
                src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
                className="object-cover rounded-xl h-64"
                alt=""
              />
              <div className="font-semibold py-4">Created 22 Sep 2021</div>
              <div className="font-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
                perspiciatis!
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for mobile screen */}
      <dialog id="my_modal_3" className="modal md:hidden">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Select a User</h3>
          <div className="py-4">
            {Users.map(user => (
              <div
                key={user.id}
                className="flex flex-row py-4 px-2 items-center border-b-2 cursor-pointer"
                onClick={() => {
                  passdata(user.id);
                  document.getElementById('my_modal_3').close();
                }}
              >
                <div className="w-1/4">
                  <img
                    src={UserandomImages[user.id] || "https://source.unsplash.com/600x600"}
                    className="object-cover h-12 w-12 rounded-full"
                    alt={user.name}
                  />
                </div>
                <div className="w-full">
                  <div className="text-lg font-semibold">{user.name}</div>
                  <span className="text-gray-500">{user.lastMessage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default NewChatbox;
