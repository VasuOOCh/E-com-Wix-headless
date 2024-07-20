'use client'
import { wixClientServer } from '@/lib/wixClientServer'
import React, { useEffect, useState } from 'react'
import { useWixClient } from '../hooks/useWixClient'
import { LoginState } from '@wix/sdk'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION"
}

const Login = () => {
  const router = useRouter()
  const [mode, setMode] = useState(MODE.LOGIN)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailCode, setEmailCode] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const formTitle = mode === MODE.LOGIN ? "Log in" : mode == MODE.REGISTER ? "Register" : mode == MODE.EMAIL_VERIFICATION ? "Verify Email" : mode === MODE.RESET_PASSWORD ? "Reset Password" : '';
  const btnTitle = mode === MODE.LOGIN ? "Login" : mode == MODE.REGISTER ? "Register" : mode == MODE.EMAIL_VERIFICATION ? "Verify" : mode === MODE.RESET_PASSWORD ? "Reset" : '';

  const wixClient = useWixClient();

  const isLoggedIn = wixClient.auth.loggedIn()
  // console.log(isLoggedIn);
  
  if(isLoggedIn) {
    return router.push('/')
  }
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('')

    try {
      let response;
      switch (mode) {
        case MODE.LOGIN:
          response = await wixClient.auth.login({
            email,
            password,
          });
          break;
        case MODE.REGISTER:
          response = await wixClient.auth.register({
            email,
            password,
            profile: { nickname: username }
          });
          break;
        case MODE.RESET_PASSWORD:
          response = await wixClient.auth.sendPasswordResetEmail(
            email,
            window.location.href
          );
          setMessage("Email has been sent for resetting password")
          break;
        case MODE.EMAIL_VERIFICATION:
          response = await wixClient.auth.processVerification({
            verificationCode: emailCode,
          });
          break;
        default:
          break;
      }
      // console.log(response);

      switch (response?.loginState) {


        case LoginState.SUCCESS:
          setMessage("Successfull ! you are being redirected");
          // console.log(response);

          const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
            response.data.sessionToken!,
          );

          wixClient.auth.setTokens(tokens);

          Cookies.set('refreshToken', JSON.stringify(tokens.refreshToken), {
            expires: 2
          });
          router.push('/')
          break;
          case LoginState.FAILURE:
            if(response.errorCode == 'emailAlreadyExists') {
              setError("Email alredy exists")
            } else if(response.errorCode == 'invalidEmail' || response.errorCode == 'invalidPassword') {
              setError("Invalid credentials")
            } else if(response.errorCode == 'resetPassword') {
              setError("You need to reset your password");
            }else {
              setError("Something went wrong")
            }
            
            break;
          case LoginState.EMAIL_VERIFICATION_REQUIRED : 
            setMode(MODE.EMAIL_VERIFICATION)
          break;
          case LoginState.OWNER_APPROVAL_REQUIRED : 
            setMessage('Owner approval required')
          break;
        default:
          break;
      }

    } catch (error) {
      console.log(error);
      setError("Something went wrong")

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='h-[calc(90vh)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center'>

      <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
        <h2 className='font-bold text-2xl'>{formTitle}</h2>
        {
          mode === MODE.REGISTER ? (
            <div className='flex flex-col gap-2'>
              <label htmlFor="username">Username</label>
              <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" id='username' name='username' placeholder='john' className='ring-2 ring-gray-300 rounded-md p-4' />
            </div>
          ) : null
        }
        {
          mode != MODE.EMAIL_VERIFICATION ? (
            <div className='flex flex-col gap-2'>
              <label htmlFor="email">Email</label>
              <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" id='email' name='email' placeholder='john@gmail.com' className='ring-2 ring-gray-300 rounded-md p-4' />
            </div>
          ) : (
            <div className='flex flex-col gap-2'>
              <label htmlFor="code">Verification code</label>
              <input onChange={(e) => setEmailCode(e.target.value)} value={emailCode} type="number" id='code' name='code' placeholder='Code' className='ring-2 ring-gray-300 rounded-md p-4' />
            </div>
          )
        }
        {
          mode == MODE.LOGIN || mode == MODE.REGISTER ? (
            <div className='flex flex-col gap-2'>
              <label htmlFor="password">Password</label>
              <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" id='password' name='password' placeholder='Password' className='ring-2 ring-gray-300 rounded-md p-4' />
            </div>
          ) : (
            null
          )
        }
        {
          mode == MODE.LOGIN && (
            <p className="text-sm text-gray-500 cursor-pointer ml-auto" onClick={() => setMode(MODE.RESET_PASSWORD)}>
              Forgot Password
            </p>
          )
        }
        {
          <button disabled={isLoading} className='bg-lama text-white rounded-md disabled:cursor-not-allowed disabled:bg-pink-200 py-3'>{
            isLoading ? "Loading" : btnTitle
          }</button>
        }
        {
          error && <div className='text-red-500'>{error}</div>
        }
        {
          mode == MODE.LOGIN && (
            <p className="tex-sm text-gray-500 cursor-pointer" onClick={() => setMode(MODE.REGISTER)}>
              Don't have an account ? <span className='font-black'>Register here</span>
            </p>
          )
        } {
          mode == MODE.REGISTER && (
            <p className="tex-sm text-gray-500 cursor-pointer" onClick={() => setMode(MODE.LOGIN)}>
              Already have an account ? <span className='font-black'>Login here</span>
            </p>
          )
        }
        {
          mode == MODE.RESET_PASSWORD && (
            <p className="tex-sm text-gray-500 cursor-pointer" onClick={() => setMode(MODE.LOGIN)}>
              Go back to login <span className='font-black'>Login</span>
            </p>
          )
        }
        {
          message && (
            <p className='text-sm text-green-600'>
              {message}
            </p>
          )
        }

      </form>
    </div>
  )
}

export default Login