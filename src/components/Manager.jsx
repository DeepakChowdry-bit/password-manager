import React, { useRef, useState, useEffect } from 'react';
import { Bounce, Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosClose } from "react-icons/io";


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

    const validateForm = () => {
        const { website, username, password } = form;

        // Check for empty fields
        if (!website.trim() || !username.trim() || !password.trim()) {
            toast.error('Please fill in all fields.', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                type: 'error',
                transition: Flip,
            });
            return false; // Prevent form submission if validation fails
        }

        // Additional validation rules (optional)
        // You can add checks for password length, special characters, etc.

        return true; // Form is valid, allow submission
    };


    const savePassword = () => {
        if (validateForm()) {
            setPasswordArray([...passwordArray, form]); // Push new form into the array
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
            toast('Password Saved', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                type: 'success',
                transition: Flip,
            });
            setForm(({ website: "", username: "", password: "" }))
        }

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
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            type: 'success',
            transition: Flip,
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
            <div className='flex flex-col gap-2 h-full items-center justify-center py-28'>
                <h2 className='text-lg font-bold uppercase text-slate-700'>
                    Your <span className='text-slate-900'>Password</span> Manager
                </h2>
                <div className='flex flex-col items-center justify-center w-[100%] md:w-[95%] gap-3 py-5'>
                    <input
                        value={form.website}
                        type='text'
                        className='h-14 w-[92%] outline-none px-3 border border-[#999] rounded-sm'
                        placeholder='Website URL'
                        onChange={handlechange}
                        name='website'
                        required
                    />
                    <div className='w-[92%] flex items-center justify-center gap-3 flex-col md:flex-row'>
                        <input
                            value={form.username}
                            type='text'
                            className='md:w-1/2 w-full h-14 border border-[#999] outline-none rounded-sm px-3'
                            placeholder='Username or Email'
                            onChange={handlechange}
                            name='username'
                            required
                        />
                        <div className='md:w-1/2 w-full h-14 border border-[#999] outline-none px-3 rounded-sm flex items-center justify-between bg-white'>
                            <input
                                value={form.password}
                                ref={passref}
                                type='password'
                                className='w-[90%] outline-none tracking-wider'
                                placeholder='Password'
                                onChange={handlechange}
                                name='password'
                                required
                            />
                            <p className='uppercase text-[11px] font-semibold cursor-pointer select-none tracking-wide' onClick={showPassword}>
                                Show
                            </p>
                        </div>
                    </div>
                    <input
                        type='button'
                        className='bg-slate-950 w-[92%] h-12 text-[#eee] font-medium tracking-wide rounded'
                        value='Add Password'
                        onClick={savePassword}
                    />
                </div>

                

                <div className='flex flex-wrap gap-3 items-center justify-center w-[100%] md:w-[95%]'>
                    {passwordArray.map((form, index) => (
                        <div className='bg-white flex flex-col items-center justify-center w-[92%] md:w-[30%] gap-3 border border-[#eee] px-3 py-4 rounded shadow shadow-[#eee]'>
                            <div className='flex items-center justify-between w-full'>
                                <h3 className='font-medium text-slate-600'>
                                    <a href={form.website} target='_blank' rel="noreferrer">{form.website}</a>
                                </h3>
                                <IoIosClose onClick={() => { deletePassword(form) }} className='text-3xl font-medium' />
                            </div>
                            <div className='flex flex-col items-start justify-between w-full pr-1 gap-2 text-sm'>
                                <h3 className='flex items-center justify-between w-full'>
                                    Username : 
                                    <p className='cursor-pointer'
                                    onClick={() => { copytext(form.username) }}>{form.username}
                                    </p>
                                </h3>
                                <h3 className='flex items-center justify-between w-full'>
                                    Password : 
                                    <p 
                                    onClick={() => { copytext(form.password) }} className='pl-5 text-right cursor-pointer'>
                                        {form.password}
                                        </p>
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </>

    );
};

export default Manager;
