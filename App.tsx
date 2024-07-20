import * as React from 'react';
import './style.css';
import RippleEffectWrapper from './RippleEffect.tsx';

export default function App() {
  return (
    <div>
      <RippleEffectWrapper>
        <button className="btn" onClick={()=>{console.log('hello')}}>Click me</button>
      </RippleEffectWrapper>
     
    </div>
  );
}
