import { useVideoStore } from '@/store/video.js'
import { useRef, useEffect, useState } from 'react';

export default function useCd() {
  const cdRef = useRef(null)
  const cdImageRef = useRef(null)

  const store = useVideoStore()

  const [cdCls, setCdCls] = useState('')
  
  useEffect(() => {
    if (!store.playing) {
      syncTransform(cdRef.current, cdImageRef.current);
      setCdCls('')
    }else {
      setCdCls('playing')
    }
  }, [store.playing]);

  function syncTransform(wrapper, inner) {
    if (wrapper && inner) {
      const wrapperTransform = getComputedStyle(wrapper).transform
      const innerTransform = getComputedStyle(inner).transform
      wrapper.style.transform = wrapperTransform === 'none' ? innerTransform : innerTransform.concat(' ', wrapperTransform)
    }
  }

  return {
    cdCls,
    cdRef,
    cdImageRef
  }
}
