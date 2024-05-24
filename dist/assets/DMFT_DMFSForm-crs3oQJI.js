import{r as u,h as j,i as d,j as t,B as a,P as h,l as F,n as _,o as f,F as g,p as S}from"./index-mCZAkBhn.js";import{T as s}from"./ToothSurfaceInputBase-ZmPW-KaB.js";const M=u.memo(function({surfaces:o,toothNumber:x,onChange:e,placeholder:n="",error:i,readOnly:c,name:l}){const p=j(),r=d(p.palette.mode);return t.jsx(a,{display:"inline-flex",flexDirection:"column",children:t.jsxs(a,{component:h,display:"inline-flex",flexDirection:"column",gap:.5,alignItems:"center",p:.5,sx:{backgroundColor:p.palette.mode==="dark"?r.primary[500]:F[100]},children:[t.jsx(s,{value:o.r,onChange:e,placeholder:n,error:i,name:l.concat(".r"),readOnly:c}),t.jsx(s,{value:o.b,onChange:e,placeholder:n,error:i,name:l.concat(".b"),readOnly:c}),t.jsxs(a,{display:"flex",gap:.5,children:[t.jsx(s,{value:o.d,onChange:e,name:l.concat(".d"),placeholder:n,error:i,readOnly:c}),t.jsx(s,{value:o.o,onChange:e,name:l.concat(".o"),placeholder:n,error:i,readOnly:c}),t.jsx(s,{value:o.m,onChange:e,name:l.concat(".m"),placeholder:n,error:i,readOnly:c})]}),t.jsx(s,{value:o.l,onChange:e,name:l.concat(".l"),placeholder:n,error:i,readOnly:c}),t.jsx(a,{mt:1,width:"100%",borderRadius:1,border:`0.5px solid ${p.palette.grey[600]}`,children:t.jsx(_,{variant:"h6",fontWeight:600,textAlign:"center",children:x.split("_")[1]})})]})})}),v=u.memo(function({surfaces:o,toothNumber:x,onChange:e,placeholder:n="",error:i,readOnly:c,name:l}){const p=j(),r=d(p.palette.mode);return t.jsx(a,{display:"inline-flex",flexDirection:"column",children:t.jsxs(a,{component:h,display:"inline-flex",flexDirection:"column",gap:.5,alignItems:"center",p:.5,sx:{backgroundColor:p.palette.mode==="dark"?r.primary[500]:F[100]},children:[t.jsx(s,{value:o.r,onChange:e,placeholder:n,error:i,name:l.concat(".r"),readOnly:c}),t.jsx(s,{value:o.b,onChange:e,placeholder:n,error:i,name:l.concat(".b"),readOnly:c}),t.jsxs(a,{display:"flex",gap:.5,children:[t.jsx(s,{value:o.m,onChange:e,name:l.concat(".m"),placeholder:n,error:i,readOnly:c}),t.jsx(s,{value:o.o,onChange:e,name:l.concat(".o"),placeholder:n,error:i,readOnly:c}),t.jsx(s,{value:o.d,onChange:e,name:l.concat(".d"),placeholder:n,error:i,readOnly:c})]}),t.jsx(s,{value:o.l,onChange:e,name:l.concat(".l"),placeholder:n,error:i,readOnly:c}),t.jsx(a,{mt:1,width:"100%",borderRadius:1,border:`0.5px solid ${p.palette.grey[600]}`,children:t.jsx(_,{variant:"h6",fontWeight:600,textAlign:"center",children:x.split("_")[1]})})]})})}),$=u.memo(function({surfaces:o,toothNumber:x,onChange:e,placeholder:n="",error:i,readOnly:c,name:l}){const p=j(),r=d(p.palette.mode);return t.jsx(a,{display:"inline-flex",flexDirection:"column",children:t.jsxs(a,{component:h,display:"inline-flex",flexDirection:"column",gap:.5,alignItems:"center",p:.5,sx:{backgroundColor:p.palette.mode==="dark"?r.primary[500]:F[100]},children:[t.jsx(s,{value:o.r,onChange:e,placeholder:n,error:i,name:l.concat(".r"),readOnly:c}),t.jsx(s,{value:o.b,name:l.concat(".b"),onChange:e,placeholder:n,error:i,readOnly:c}),t.jsxs(a,{display:"flex",gap:.5,children:[t.jsx(s,{value:o.d,name:l.concat(".d"),placeholder:n,error:i,onChange:e,readOnly:c}),t.jsx(s,{disabled:!0,name:""}),t.jsx(s,{value:o.m,name:l.concat(".m"),placeholder:n,error:i,onChange:e,readOnly:c})]}),t.jsx(s,{value:o.l,name:l.concat(".l"),placeholder:n,error:i,onChange:e,readOnly:c}),t.jsx(a,{mt:1,width:"100%",borderRadius:1,border:`0.5px solid ${p.palette.grey[600]}`,children:t.jsx(_,{variant:"h6",fontWeight:600,textAlign:"center",children:x.split("_")[1]})})]})})}),D=u.memo(function({surfaces:o,toothNumber:x,onChange:e,placeholder:n="",error:i,readOnly:c,name:l}){const p=j(),r=d(p.palette.mode);return t.jsx(a,{display:"inline-flex",flexDirection:"column",children:t.jsxs(a,{component:h,display:"inline-flex",flexDirection:"column",gap:.5,alignItems:"center",p:.5,sx:{backgroundColor:p.palette.mode==="dark"?r.primary[500]:F[100]},children:[t.jsx(s,{value:o.r,onChange:e,placeholder:n,error:i,name:l.concat(".r"),readOnly:c}),t.jsx(s,{value:o.b,name:l.concat(".b"),onChange:e,placeholder:n,error:i,readOnly:c}),t.jsxs(a,{display:"flex",gap:.5,children:[t.jsx(s,{value:o.m,name:l.concat(".m"),placeholder:n,error:i,onChange:e,readOnly:c}),t.jsx(s,{disabled:!0,name:""}),t.jsx(s,{value:o.d,name:l.concat(".d"),placeholder:n,error:i,onChange:e,readOnly:c})]}),t.jsx(s,{value:o.l,name:l.concat(".l"),placeholder:n,error:i,onChange:e,readOnly:c}),t.jsx(a,{mt:1,width:"100%",borderRadius:1,border:`0.5px solid ${p.palette.grey[600]}`,children:t.jsx(_,{variant:"h6",fontWeight:600,textAlign:"center",children:x.split("_")[1]})})]})})}),T=u.memo(function({upperMouth:o,isViewMode:x,handleChange:e}){return t.jsxs(a,{children:[t.jsx(t.Fragment,{children:[18,17,16,15,14].map(n=>t.jsx(M,{surfaces:o[`tooth_${n}`],toothNumber:`tooth_${n}`,name:`upperMouth.tooth_${n}`,onChange:e,readOnly:x},n))}),t.jsx(t.Fragment,{children:[13,12,11].map(n=>t.jsx($,{surfaces:o[`tooth_${n}`],toothNumber:`tooth_${n}`,name:`upperMouth.tooth_${n}`,onChange:e,readOnly:x},n))}),t.jsx(t.Fragment,{children:[21,22,23].map(n=>t.jsx(D,{surfaces:o[`tooth_${n}`],toothNumber:`tooth_${n}`,name:`upperMouth.tooth_${n}`,onChange:e,readOnly:x},n))}),t.jsx(t.Fragment,{children:[24,25,26,27,28].map(n=>t.jsx(v,{surfaces:o[`tooth_${n}`],toothNumber:`tooth_${n}`,name:`upperMouth.tooth_${n}`,onChange:e,readOnly:x},n))})]})}),I=u.memo(function({upperMouth:o,lowerMouth:x,handleChange:e,isView:n}){return t.jsxs(a,{mt:"1rem",mb:"1rem",children:[t.jsx(a,{width:"100%",display:"flex",gap:.5,children:[55,54,53,52,51,61,62,63,64,65].map(i=>t.jsx(s,{value:o[`tooth_${i}`],onChange:e,name:`upperMouth.tooth_${i}`,readOnly:n,width:"3rem",height:"2rem",placeholder:`${i}`},i))}),t.jsx(a,{width:"100%",display:"flex",gap:.5,children:[85,84,83,82,81,71,72,73,74,75].map(i=>t.jsx(s,{value:x[`tooth_${i}`],onChange:e,name:`lowerMouth.tooth_${i}`,readOnly:n,width:"3rem",height:"2rem",placeholder:`${i}`},i))})]})}),y=u.memo(function({lowerMouth:o,isView:x,handleChange:e}){return t.jsxs(a,{children:[t.jsx(t.Fragment,{children:[48,47,46,45,44].map(n=>t.jsx(M,{surfaces:o[`tooth_${n}`],toothNumber:`tooth_${n}`,name:`lowerMouth.tooth_${n}`,onChange:e,readOnly:x},n))}),t.jsx(t.Fragment,{children:[43,42,41].map(n=>t.jsx($,{surfaces:o[`tooth_${n}`],toothNumber:`tooth_${n}`,name:`lowerMouth.tooth_${n}`,onChange:e,readOnly:x},n))}),t.jsx(t.Fragment,{children:[31,32,33].map(n=>t.jsx(D,{surfaces:o[`tooth_${n}`],toothNumber:`tooth_${n}`,name:`lowerMouth.tooth_${n}`,onChange:e,readOnly:x},n))}),t.jsx(t.Fragment,{children:[34,35,36,37,38].map(n=>t.jsx(v,{surfaces:o[`tooth_${n}`],toothNumber:`tooth_${n}`,name:`lowerMouth.tooth_${n}`,onChange:e,readOnly:x},n))})]})}),b=f(function({dmft_dmfs:o,isView:x=!1}){return t.jsx(a,{mt:3,children:t.jsx(g,{initialValues:{...o==null?void 0:o.assessmentModel},onSubmit:e=>console.log(e),children:({values:e,handleSubmit:n,handleChange:i})=>t.jsx(S,{onSubmit:n,children:t.jsxs(a,{display:"flex",flexDirection:"column",alignItems:"center",children:[t.jsx(T,{upperMouth:e.upperMouth,isViewMode:x,handleChange:i}),t.jsx(I,{upperMouth:e.upperMouth,lowerMouth:e.lowerMouth,isView:x}),t.jsx(y,{lowerMouth:e.lowerMouth,isView:x,handleChange:i})]})})})})});export{b as default};
