"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Update(props) {    
    const router = useRouter();
    /*
        [형식]
        const [state, setState] = useState(초기값);
        useState() : 컴포넌트가 가질 수 있는 상태
        
        [형식]
        useEffect(()=>{});
        useEffect() : 컴포넌트가 렌더링 될 때마다 특정 작업을 실행할 수 있도록 하는 Hook
     */
    const id = props.params.id;
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    useEffect(()=>{
        fetch(`http://localhost:9999/topics/${id}`)
            .then(res=>res.json())
            .then(result=>{
                // console.log(result);
                setTitle(result.title);
                setBody(result.body);
            })
    },[]); // [] : 한 번만 실행
    return(     
        <>
            <h2>Update</h2>
            <form onSubmit={e=>{
                e.preventDefault();
                const title = e.target.title.value;
                const body = e.target.body.value;

                const options = {
                    method: 'PATCH',
                    headers: { 'Content-Type' : 'application/json' },
                    body: JSON.stringify({title, body})
                }
                fetch(`http://localhost:9999/topics/${id}`, options)
                    .then(res=>res.json())
                    .then(result=> {
                        console.log(result);
                        const lastId = result.id;
                        router.push(`/read/${lastId}`) // read 페이지로 이동
                        router.refresh(); // 페이지 새로고침
                    })
            }}>
                {/* onChange() 이벤트를 통해 데이터가 변할 때마다 setter 작업을 해서 value 값에 넣어줌 */}
                <p><input type="text" name="title" value={title} onChange={e=>{setTitle(e.target.value)}}/></p>
                <p><textarea name="body" value={body} onChange={e=>setBody(e.target.value)}/></p>
                <input type="submit" value="update"/>
            </form>
        </>
    )
}