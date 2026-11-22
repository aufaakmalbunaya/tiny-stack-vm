import{readFileSync as R,mkdirSync as M,writeFileSync as W}from"node:fs"
let{MAKEFUN_INPUT_DIR:I="/input",MAKEFUN_OUTPUT_DIR:O="/output"}=process.env
for(let i=0;++i<41;){
let d="i0"+(i<10?"0"+i:i)
let P=R(I+"/"+d+"/program.bin"),G=R(I+"/"+d+"/input.bin")
let s=[],c=[],m={},o="",t=0,y=0,x=0,e=-1,j,a,b,U,V
while(e<0){
if(t>=1e6)e=10
else if(x<0||x>=P.length)e=9
else{let k=P[x],n=k==1?1:k==2?4:k>47&&k<52?2:0,q=(P[x+1]|P[x+2]<<8)<<16>>16
if(x+1+n>P.length)e=9
else{t++,j=0
if(k>15&&k<35&&k!=23&&k!=27&&k!=31){
if(s.length<2)e=2
else if(!s.at(-1)&&k>18&&k<23)e=4
else{b=s.pop();a=s.pop();U=a>>>0;V=b>>>0;s.push(k==16?a+b|0:k==17?a-b|0:k==18?Math.imul(a,b):k==19?a/b|0:k==20?a%b:k==21?U/V|0:k==22?U%V|0:k==24?a&b:k==25?a|b:k==26?a^b:k==28?a<<b:k==29?a>>b:k==30?a>>>b|0:k==32?+(a==b):k==33?+(a<b):+(U<V))}
}else switch(k){
case 0:e=0;break
case 1:s.length>255?e=3:s.push(P[x+1]<<24>>24);break
case 2:s.length>255?e=3:s.push(P.readInt32LE(x+1));break
case 3:s.length?s.pop():e=2;break
case 4:s.length?s.length>255?e=3:s.push(s.at(-1)):e=2;break
case 5:if(s.length<2)e=2;else s.push(s.splice(-2,1)[0]);break
case 6:s.length<2?e=2:s.length>255?e=3:s.push(s.at(-2));break
case 7:if(s.length<3)e=2;else s.push(s.splice(-3,1)[0]);break
case 23:s.length?s[s.length-1]=-s.at(-1)|0:e=2;break
case 27:s.length?s[s.length-1]=~s.at(-1):e=2;break
case 48:x+=3+q;j=1;break
case 49:case 50:if(s.length){a=s.pop();if(!a==(k<50)){x+=3+q;j=1}}else e=2;break
case 51:c[63]?e=7:(c.push(x+3),x=q&65535,j=1);break
case 52:c[0]?(x=c.pop(),j=1):e=8;break
case 64:if(s.length){a=s.pop();a<0||a>255?e=6:s.push(m[a]|0)}else e=2;break
case 65:if(s.length<2)e=2;else{a=s.pop();b=s.pop();a<0||a>255?e=6:m[a]=b}break
case 80:if(s.length){a=s.pop()+"";o.length+a.length>65536?e=11:o+=a}else e=2;break
case 81:if(s.length){o.length>65535?e=11:o+=String.fromCharCode(s.pop()&255)}else e=2;break
case 82:s.length>255?e=3:s.push(y<G.length?G[y++]:-1);break
case 83:s.length?e=s.pop()&255:e=2;break
default:e=5
}
if(!j)x+=1+n
}}}
let v=O+"/"+d+"/"
M(v,{recursive:!0})
W(v+"stdout.bin",Buffer.from(o,"latin1"))
W(v+"exit.txt",e+"\n")
}
