// 사용자 모듈로 변경
"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
/*
  [목적] update, delete button을 root 페이지가 아닌 id를 포함하고 있는 페이지에서만 보여주고 싶음
 */
export function Control() {
  const params = useParams();
  const id = params.id;
  return (
    <ul>
      <li><Link href='/create'>create</Link></li>
      {id ? <>
          <li><Link href='/update/id'>update</Link></li>
          <li><button>delete</button></li>
        </> : null
      }
    </ul>
  );
}
