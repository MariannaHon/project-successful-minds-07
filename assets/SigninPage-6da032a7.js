import{r as o,u as N,c as b,a as _,j as s,J as y,F as v,d as f,e as p,E as u,U as F,V as P,Y as q,Z as x}from"./index-832a9f01.js";const E="_form_9mgxk_1",I="_wrap_9mgxk_6",S="_label_9mgxk_10",$="_input_9mgxk_19",R="_valid_9mgxk_37",C="_short_9mgxk_43",V="_long_9mgxk_44",D="_required_9mgxk_45",A="_error_9mgxk_50",J="_button_9mgxk_58",L="_link_9mgxk_75",M="_eye_9mgxk_82",a={form:E,wrap:I,label:S,input:$,valid:R,short:C,long:V,required:D,error:A,button:J,link:L,eye:M},O=()=>{const[t,l]=o.useState("password"),[g,c]=o.useState(!0),w=N(),h=(e,i)=>{const j={email:e.email,password:e.password};w(q(j)).unwrap(),i.resetForm()},k=b().shape({email:_().email("Please enter a valid email address").required("Email is Required"),password:_().min(8,"Password must be at least 8 characters").max(64,"Password must be no more than 64 characters").required("Password is Required")}),d=o.useId(),r=o.useId(),m=()=>{t==="password"?(l("text"),c(!1)):(l("password"),c(!0))};return s.jsxs(s.Fragment,{children:[s.jsx(y,{}),s.jsx(v,{initialValues:{email:"",password:""},validationSchema:k,onSubmit:h,children:({errors:e,touched:i})=>s.jsxs(f,{className:a.form,name:"Sign In",noValidate:!0,children:[s.jsxs("div",{className:a.formContainer,children:[s.jsx("label",{htmlFor:d,className:a.label,children:"Enter your email"}),s.jsxs("div",{className:a.wrap,children:[s.jsx(p,{type:"email",name:"email",autoComplete:"off",id:d,className:`${a.input} ${e.email&&i.email?e.email==="Email is Required"?a.required:a.invalid:i.email&&!e.email?a.valid:""}`,placeholder:"Email"}),s.jsx(u,{name:"email",component:"span",className:a.error})]})]}),s.jsxs("div",{className:a.formContainer,children:[s.jsx("label",{htmlFor:r,className:a.label,children:"Enter your password"}),s.jsxs("div",{className:a.wrap,children:[s.jsx(p,{type:t,name:"password",autoComplete:"off",id:r,className:`${a.input} ${e.password&&i.password?e.password==="Password must be at least 8 characters"?a.short:e.password==="Password must be no more than 64 characters"?a.long:e.password==="Password is Required"?a.required:a.invalid:i.password&&!e.password?a.valid:""}`,placeholder:"Password"}),s.jsx("span",{children:g?s.jsx(F,{name:"password",id:`${r}-password`,className:a.eye,onClick:m}):s.jsx(P,{name:"outPassword",id:`${r}-password`,className:a.eye,onClick:m})})]}),s.jsx(u,{name:"password",component:"span",className:a.error})]}),s.jsx("button",{type:"submit",className:a.button,children:"Sign In"})]})})]})},T="_background_1lxyr_1",U="_image_1lxyr_13",Y="_container_1lxyr_19",Z="_container_signin_1lxyr_32",z="_title_1lxyr_38",B="_container_links_1lxyr_43",G="_link_1lxyr_48",n={background:T,image:U,container:Y,container_signin:Z,title:z,container_links:B,link:G},K=()=>s.jsx("div",{className:n.container,children:s.jsxs("div",{className:n.background,children:[s.jsx("div",{className:n.image}),s.jsxs("div",{className:n.container_signin,children:[s.jsx("h2",{className:n.title,children:"Sign In"}),s.jsx(O,{}),s.jsxs("div",{className:n.container_links,children:[s.jsx(x,{className:n.link,to:"/forgot-password",children:"Forgot your password?"}),s.jsx(x,{className:n.link,to:"/signup",children:"Sign up"})]})]})]})});export{K as default};
//# sourceMappingURL=SigninPage-6da032a7.js.map
