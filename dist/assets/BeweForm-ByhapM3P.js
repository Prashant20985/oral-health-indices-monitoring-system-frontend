import{r as p,h as j,i as u,j as t,B as x,P as f,l as h,n as v,o as F,F as y,p as B}from"./index-mCZAkBhn.js";import{T as a}from"./ToothSurfaceInputBase-ZmPW-KaB.js";const _=p.memo(function({surfaces:e,toothNumber:l,onChange:s,placeholder:n="",error:o,name:c,readOnly:i}){const m=j(),r=u(m.palette.mode);return t.jsx(x,{display:"inline-flex",flexDirection:"column",children:t.jsxs(x,{component:f,display:"inline-flex",flexDirection:"column",gap:.5,alignItems:"center",p:.5,sx:{backgroundColor:m.palette.mode==="dark"?r.primary[500]:h[100]},children:[t.jsx(a,{disabled:!0,name:""}),t.jsx(a,{value:e.b,name:c.concat(".b"),onChange:s,placeholder:n,error:o,readOnly:i}),t.jsxs(x,{display:"flex",gap:.5,children:[t.jsx(a,{value:e.d,name:c.concat(".d"),placeholder:n,error:o,onChange:s,readOnly:i}),t.jsx(a,{disabled:!0,name:""}),t.jsx(a,{value:e.m,name:c.concat(".m"),placeholder:n,error:o,onChange:s,readOnly:i})]}),t.jsx(a,{value:e.l,name:c.concat(".l"),placeholder:n,error:o,onChange:s,readOnly:i}),t.jsx(x,{mt:1,width:"100%",borderRadius:1,border:`0.5px solid ${m.palette.grey[600]}`,children:t.jsx(v,{variant:"h6",fontWeight:600,textAlign:"center",children:l.split("_")[1]})})]})})}),$=p.memo(function({surfaces:e,toothNumber:l,onChange:s,placeholder:n="",error:o,readOnly:c,name:i}){const m=j(),r=u(m.palette.mode);return t.jsx(x,{display:"inline-flex",flexDirection:"column",children:t.jsxs(x,{component:f,display:"inline-flex",flexDirection:"column",gap:.5,alignItems:"center",p:.5,sx:{backgroundColor:m.palette.mode==="dark"?r.primary[500]:h[100]},children:[t.jsx(a,{disabled:!0,name:""}),t.jsx(a,{value:e.b,name:i.concat(".b"),onChange:s,placeholder:n,error:o,readOnly:c}),t.jsxs(x,{display:"flex",gap:.5,children:[t.jsx(a,{value:e.d,name:i.concat(".d"),placeholder:n,error:o,onChange:s,readOnly:c}),t.jsx(a,{value:e.o,onChange:s,name:i.concat(".o"),placeholder:n,error:o,readOnly:c}),t.jsx(a,{value:e.m,name:i.concat(".m"),placeholder:n,error:o,onChange:s,readOnly:c})]}),t.jsx(a,{value:e.l,name:i.concat(".l"),placeholder:n,error:o,onChange:s,readOnly:c}),t.jsx(x,{mt:1,width:"100%",borderRadius:1,border:`0.5px solid ${m.palette.grey[600]}`,children:t.jsx(v,{variant:"h6",fontWeight:600,textAlign:"center",children:l.split("_")[1]})})]})})}),g=p.memo(function({surfaces:e,toothNumber:l,onChange:s,placeholder:n="",error:o,name:c,readOnly:i}){const m=j(),r=u(m.palette.mode);return t.jsx(x,{display:"inline-flex",flexDirection:"column",children:t.jsxs(x,{component:f,display:"inline-flex",flexDirection:"column",gap:.5,alignItems:"center",p:.5,sx:{backgroundColor:m.palette.mode==="dark"?r.primary[500]:h[100]},children:[t.jsx(a,{disabled:!0,name:""}),t.jsx(a,{value:e.b,name:c.concat(".b"),onChange:s,placeholder:n,error:o,readOnly:i}),t.jsxs(x,{display:"flex",gap:.5,children:[t.jsx(a,{value:e.m,name:c.concat(".m"),placeholder:n,error:o,onChange:s,readOnly:i}),t.jsx(a,{disabled:!0,name:""}),t.jsx(a,{value:e.d,name:c.concat(".d"),placeholder:n,error:o,onChange:s,readOnly:i})]}),t.jsx(a,{value:e.l,name:c.concat(".l"),placeholder:n,error:o,onChange:s,readOnly:i}),t.jsx(x,{mt:1,width:"100%",borderRadius:1,border:`0.5px solid ${m.palette.grey[600]}`,children:t.jsx(v,{variant:"h6",fontWeight:600,textAlign:"center",children:l.split("_")[1]})})]})})}),I=p.memo(function({surfaces:e,toothNumber:l,onChange:s,placeholder:n="",error:o,readOnly:c,name:i}){const m=j(),r=u(m.palette.mode);return t.jsx(x,{display:"inline-flex",flexDirection:"column",children:t.jsxs(x,{component:f,display:"inline-flex",flexDirection:"column",gap:.5,alignItems:"center",p:.5,sx:{backgroundColor:m.palette.mode==="dark"?r.primary[500]:h[100]},children:[t.jsx(a,{disabled:!0,name:""}),t.jsx(a,{value:e.b,name:i.concat(".b"),onChange:s,placeholder:n,error:o,readOnly:c}),t.jsxs(x,{display:"flex",gap:.5,children:[t.jsx(a,{value:e.m,name:i.concat(".m"),placeholder:n,error:o,onChange:s,readOnly:c}),t.jsx(a,{value:e.o,onChange:s,name:i.concat(".o"),placeholder:n,error:o,readOnly:c}),t.jsx(a,{value:e.d,name:i.concat(".d"),placeholder:n,error:o,onChange:s,readOnly:c})]}),t.jsx(a,{value:e.l,name:i.concat(".l"),placeholder:n,error:o,onChange:s,readOnly:c}),t.jsx(x,{mt:1,width:"100%",borderRadius:1,border:`0.5px solid ${m.palette.grey[600]}`,children:t.jsx(v,{variant:"h6",fontWeight:600,textAlign:"center",children:l.split("_")[1]})})]})})}),T=p.memo(function({bewe:e,isView:l,handleChange:s}){return t.jsxs(x,{children:[t.jsx(t.Fragment,{children:[17,16,15,14].map(n=>t.jsx($,{surfaces:(e==null?void 0:e.sectant1)[`tooth_${n}`],toothNumber:`tooth_${n}`,name:`sectant1.tooth_${n}`,onChange:s,readOnly:l},n))}),t.jsx(t.Fragment,{children:[13,12,11].map(n=>t.jsx(_,{surfaces:(e==null?void 0:e.sectant2)[`tooth_${n}`],toothNumber:`tooth_${n}`,name:`sectant2.tooth_${n}`,onChange:s,readOnly:l},n))}),t.jsx(t.Fragment,{children:[21,22,23].map(n=>t.jsx(g,{surfaces:(e==null?void 0:e.sectant2)[`tooth_${n}`],toothNumber:`tooth_${n}`,name:`sectant2.tooth_${n}`,onChange:s,readOnly:l},n))}),t.jsx(t.Fragment,{children:[24,25,26,27].map(n=>t.jsx(I,{surfaces:(e==null?void 0:e.sectant3)[`tooth_${n}`],toothNumber:`tooth_${n}`,name:`sectant3.tooth_${n}`,onChange:s,readOnly:l},n))})]})}),S=p.memo(function({bewe:e,isView:l,handleChange:s}){return t.jsxs(x,{children:[t.jsx(t.Fragment,{children:[47,46,45,44].map(n=>t.jsx($,{surfaces:e.sectant6[`tooth_${n}`],toothNumber:`tooth_${n}`,name:`sectant6.tooth_${n}`,onChange:s,readOnly:l},n))}),t.jsx(t.Fragment,{children:[43,42,41].map(n=>t.jsx(_,{surfaces:e.sectant5[`tooth_${n}`],toothNumber:`tooth_${n}`,name:`sectant5.tooth_${n}`,onChange:s,readOnly:l},n))}),t.jsx(t.Fragment,{children:[31,32,33].map(n=>t.jsx(g,{surfaces:e.sectant5[`tooth_${n}`],toothNumber:`tooth_${n}`,name:`sectant5.tooth_${n}`,onChange:s,readOnly:l},n))}),t.jsx(t.Fragment,{children:[34,35,36,37].map(n=>t.jsx(I,{surfaces:e.sectant4[`tooth_${n}`],toothNumber:`tooth_${n}`,name:`sectant4.tooth_${n}`,onChange:s,readOnly:l},n))})]})}),M=F(function({bewe:e,isView:l=!1}){return t.jsx(x,{mt:3,children:t.jsx(y,{initialValues:{...e==null?void 0:e.assessmentModel},onSubmit:s=>console.log(s),children:({values:s,handleSubmit:n,handleChange:o})=>t.jsx(B,{onSubmit:n,children:t.jsxs(x,{display:"flex",flexDirection:"column",alignItems:"center",gap:4,children:[t.jsx(T,{bewe:s,handleChange:o,isView:l}),t.jsx(S,{bewe:s,handleChange:o,isView:l})]})})})})});export{M as default};
