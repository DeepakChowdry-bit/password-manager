import React, { useRef, useState, useEffect } from 'react';
import { Bounce, Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Manager = () => {

    const [form, setForm] = useState({ website: "", username: "", password: "" })

    const [passwordArray, setPasswordArray] = useState([]);

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            try {
                const parsedPasswords = JSON.parse(passwords);
                if (Array.isArray(parsedPasswords)) {
                    setPasswordArray(parsedPasswords);
                } else {
                    console.error("Stored passwords is not an array:", parsedPasswords);
                }
            } catch (error) {
                console.error("Error parsing stored passwords:", error);
            }
        }
    }, []);

    const passref = useRef();

    const changePasswordType = () => {
        if (passref.current.type.includes("password")) {
            passref.current.type = "text";
        } else {
            passref.current.type = "password";
        }
    };

    const showPassword = () => {
        if (passref.current.nextElementSibling.innerHTML.includes("Show")) {
            passref.current.nextElementSibling.innerHTML = "Hide";
        } else {
            passref.current.nextElementSibling.innerHTML = "Show";
        }
        changePasswordType();
    };


    const savePassword = () => {
        setPasswordArray([...passwordArray, form]); // Push new form into the array
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
        toast('Password Saved', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            type: 'success',
            transition: Bounce,
        });
    };

    const deletePassword = (form) => {
        setPasswordArray(passwordArray.filter(password => password !== form));
        localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(password => password !== form)));

    }

    const handlechange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value }) // Use e.target.value directly
    }


    const copytext = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            type: 'success',
            transition: Bounce,
        });
        navigator.clipboard.writeText(text)
    }
    return (
        <>
            <ToastContainer
                position="bottom-center"
                autoClose
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            <div className='flex flex-col gap-5 h-full items-center justify-center py-28'>
                <h2 className='text-xl font-bold uppercase'>
                    Your <span className='text-green-500'>Password</span> Manager
                </h2>
                <div className='flex flex-col items-center justify-center w-[100%] md:w-[85%] gap-4 py-5'>
                    <input
                        value={form.website}
                        type='text'
                        className='h-12 w-[95%] outline-none px-3 border border-[#999] rounded-sm'
                        placeholder='Website URL'
                        onChange={handlechange}
                        name='website'
                    />
                    <div className='w-[95%] flex items-center justify-center gap-2 flex-col md:flex-row'>
                        <input
                            value={form.username}
                            type='text'
                            className='md:w-1/2 w-full h-12 border border-[#999] outline-none rounded-sm px-3'
                            placeholder='Username or Email'
                            onChange={handlechange}
                            name='username'
                        />
                        <div className='md:w-1/2 w-full h-12 border border-[#999] outline-none px-3 rounded-sm flex items-center justify-between'>
                            <input
                                value={form.password}
                                ref={passref}
                                type='password'
                                className='w-[90%] outline-none tracking-wider'
                                placeholder='Password'
                                onChange={handlechange}
                                name='password'

                            />
                            <p className='uppercase text-[11px] font-bold cursor-pointer select-none tracking-wide' onClick={showPassword}>
                                Show
                            </p>
                        </div>
                    </div>
                    <input
                        type='button'
                        className='bg-slate-900 w-[95%] h-10 text-[#eee] font-medium tracking-wide'
                        value='Add Password'
                        onClick={savePassword}
                    />
                </div>

                <div className='flex flex-col items-center justify-center w-[100%] md:w-[85%] gap-4 py-5'>
                    {passwordArray.length === 0 && <div>No Password Yet</div>}
                    {passwordArray.length !== 0 && <table border='2' className='border border-[#555] w-[95%]'>
                        <thead>
                            <tr className='bg-slate-900 text-[#eee]'>
                                <th className='border border-black font-medium w-2/6'>Website</th>
                                <th className='border border-black font-medium w-2/6'>Username</th>
                                <th className='border border-black font-medium w-2/6'>Password</th>
                                <th className='border border-black font-medium w-1/6 px-3'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {passwordArray.map((form, index) => (
                                <tr key={index} className='text-center font-medium text-xs md:text-base'>
                                    <td className='border border-black'>
                                        <a href={form.website} target='_blank' rel="noreferrer">{form.website}</a>
                                    </td>
                                    <td className='border border-black'>{form.username}</td>
                                    <td onClick={() => { copytext(form.password) }} className='border border-black cursor-pointer'>
                                        {form.password}
                                    </td>
                                    <td className='flex items-center justify-center gap-4 text-xs font-normal '>

                                        <p className='w-full h-6 flex items-center justify-center bg-black text-white cursor-pointer rounded-sm' onClick={() => { deletePassword(form) }}>Delete</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>

    );
};

export default Manager;
