"use client";

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Loginlayout() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState('')
    const router = useRouter();
  
    const handleLogin = async(e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      try {
        const userCredential = await signInWithEmailAndPassword(auth,email,password);
        const idToken = await userCredential.user.getIdToken()

        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: idToken }),
          });
    
          if (!response.ok) {
            throw new Error("Failed to set token");
          }

        router.push("/dashboard")
      } catch (error:any) {
        setError(error.message)
      }
    };


    return (
        <>
            <div>
                <div style={{ maxWidth: '400px', margin: '100px auto', textAlign: 'center' }}>
                    <h1>Login</h1>
                    <form onSubmit={handleLogin}>
                        <div style={{ marginBottom: '1rem' }}>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{ width: '100%', padding: '8px',color:'black' }}
                            />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{ width: '100%', padding: '8px' ,color:"black"}}
                            />
                        </div>
                        <button type="submit" style={{ padding: '10px 20px' }}>
                            Login
                        </button>
                    </form>
                </div>
                <div>{error}</div>
            </div>
        </>
    )
}