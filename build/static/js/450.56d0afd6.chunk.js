"use strict";(self.webpackChunkbtn_frontend=self.webpackChunkbtn_frontend||[]).push([[450],{15112:function(n,e,i){i.d(e,{d:function(){return t}});var t={apiVersion:i(62716).XZ.profile}},50203:function(n,e,i){i.d(e,{n:function(){return o}});var t=i(62716),r=i(40056),a=i(15112),o=function(){return(0,r.useMutation)((function(n){var e=n.uid;return t.ZP.get(a.d,"/get-profile-by-id?uid=".concat(e))}))}},37450:function(n,e,i){i.r(e),i.d(e,{default:function(){return Ln}});var t,r,a,o,s,l,d,c=i(17186),u=i(47313),g=i(49814),p=i(33032),h=i(50678),f=i(84322),m=i.n(f),x=i(47131),v=i(98554),b=i(59491),_=i(22855),w=g.ZP.div(t||(t=(0,c.Z)(["\n  position: relative;\n  width: 100%;\n  height: 550px;\n  border-radius: 10px;\n\n  .background-img {\n    position: absolute;\n    width: 100%;\n    height: 80%;\n    object-fit: cover;\n    border-radius: 10px 10px 0 0;\n  }\n"]))),Z=(0,g.ZP)(b.Z)(r||(r=(0,c.Z)(["\n  position: absolute;\n  bottom: 130px;\n  right: 30px;\n  height: 50px;\n  border-radius: 10px;\n  background-color: #fff;\n"]))),j=g.ZP.div(a||(a=(0,c.Z)(["\n  position: absolute;\n  bottom: 40px;\n  left: 30px;\n  display: flex;\n  flex-direction: row;\n\n  .user-avatar {\n    position: relative;\n\n    &__camera {\n      position: absolute;\n      bottom: -4px;\n      right: -11px;\n    }\n  }\n\n  .user-inform {\n    display: flex;\n    flex-direction: column;\n    margin-left: 15px;\n    margin-top: 35px;\n\n    &__address {\n      margin-top: 10px;\n      display: flex;\n      flex-direction: row;\n      justify-content: space-between;\n\n      &__detail {\n        display: flex;\n        flex-direction: row;\n        margin-right: 15px;\n      }\n    }\n  }\n"]))),y=(0,g.ZP)(_.C)(o||(o=(0,c.Z)(["\n  border: 1px solid black;\n  width: 100px;\n  height: 100px;\n"]))),k=(0,g.ZP)(v.Z)(s||(s=(0,c.Z)(["\n  font-family: Roboto;\n  font-size: 36px;\n  font-weight: bold;\n  color: rgba(0, 0, 0, 0.8);\n"]))),P=(0,g.ZP)(b.Z)(l||(l=(0,c.Z)(["\n  position: absolute;\n  bottom: 40px;\n  right: 30px;\n  height: 50px;\n  width: 155px;\n  border-radius: 10px;\n  background-color: rgba(124, 223, 255, 1);\n  line-height: 28px;\n  color: #000;\n"]))),N=(0,g.ZP)(b.Z)(d||(d=(0,c.Z)(["\n  position: absolute;\n  bottom: 40px;\n  right: 200px;\n  height: 50px;\n  width: 155px;\n  border-radius: 10px;\n  background-color: rgba(124, 223, 255, 1);\n  line-height: 28px;\n  color: #000;\n"])));var z=i.p+"static/media/address.977bb07401429dc52bfad5732a803f63.svg";var C=i.p+"static/media/calendar.0443339e6268de5a8f0643d8fc519cb3.svg";var S,R,L=i.p+"static/media/camera.230f598883faa16f07fa4d1cbee96bbf.svg",D=i(97890),E=i(62716),U=i(40056),A=i(15112),F=i(81922),I=i(58821),M=i(67218),O=i(37394),T=i(46417),J=g.ZP.div(S||(S=(0,c.Z)(["\n  position: fixed;\n  display: ",";\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 2;\n  cursor: pointer;\n  text-align: center;\n"])),(function(n){return n.active?"block":"none"})),W=g.ZP.div(R||(R=(0,c.Z)(["\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  -ms-transform: translate(-50%, -50%);\n"]))),V=function(n){var e=(0,D.s0)(),i=(0,U.useMutation)((function(n){var e=new FormData;return e.append("avatar",n),E.ZP.put(A.d,"/edit-avatar-file",{body:e})})),t=(0,U.useMutation)((function(n){var e=new FormData;return e.append("cover_image",n),E.ZP.put(A.d,"/edit-background-cover-file",{body:e})})),r=n.profileInfo,a=n.isCurrentUser,o=r.first_name+" "+r.last_name,s=new FileReader,l=(0,u.useState)(),d=(0,h.Z)(l,2),c=d[0],g=d[1],f=(0,u.useState)(),b=(0,h.Z)(f,2),_=b[0],S=b[1],R=(0,u.useState)(),V=(0,h.Z)(R,2),B=V[0],Q=V[1],Y=(0,u.useState)(),G=(0,h.Z)(Y,2),H=G[0],K=G[1],X=u.useRef(null),q=u.useRef(null),$=(0,u.useState)(!1),nn=(0,h.Z)($,2),en=nn[0],tn=nn[1],rn=function(){var n=(0,p.Z)(m().mark((function n(){var i;return m().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,E.ZP.post(M.U,"/create-group-chat-private?uid=".concat(r.uid));case 3:(i=n.sent)&&e("/chat/".concat(i.group_chat_id)),n.next=10;break;case 7:n.prev=7,n.t0=n.catch(0),e("/");case 10:case"end":return n.stop()}}),n,null,[[0,7]])})));return function(){return n.apply(this,arguments)}}();return(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(J,{active:i.isLoading||t.isLoading,children:(0,T.jsx)(W,{children:(0,T.jsx)(F.Z,{})})}),(0,T.jsxs)(w,{children:[(0,T.jsx)("img",{className:"background-img",src:B||(r.cover_image?r.cover_image:"https://www.akamai.com/site/im-demo/perceptual-standard.jpg?imbypass=true"),alt:"background-image"}),a&&(0,T.jsxs)(Z,{onClick:function(){var n;null===q||void 0===q||null===(n=q.current)||void 0===n||n.click()},children:[(0,T.jsx)("input",{type:"file",id:"file-1",ref:q,style:{display:"none"},accept:"image/*",onChange:function(n){var e,i;n.stopPropagation(),n.preventDefault();var t=null===n||void 0===n||null===(e=n.target)||void 0===e||null===(i=e.files)||void 0===i?void 0:i.item(0);s.readAsDataURL(t),K(t),s.addEventListener("load",(function(n){var e,i;tn((function(n){return!0})),console.log(null===(e=n.target)||void 0===e?void 0:e.result),Q(null===(i=n.target)||void 0===i?void 0:i.result)}))}}),"Edit Cover Photo"]}),(0,T.jsxs)(j,{children:[(0,T.jsxs)("div",{className:"user-avatar",children:[(0,T.jsx)(y,{shape:"circle",size:"large",src:(0,T.jsx)("img",{src:c||(r.avatar?r.avatar:"https://thelifetank.com/wp-content/uploads/2018/08/avatar-default-icon.png")})}),a&&(0,T.jsxs)(x.Z,{className:"user-avatar__camera",onClick:function(){var n;null===X||void 0===X||null===(n=X.current)||void 0===n||n.click()},children:[(0,T.jsx)("input",{type:"file",id:"file",ref:X,style:{display:"none"},accept:"image/*",onChange:function(n){var e,i;n.stopPropagation(),n.preventDefault();var t=null===n||void 0===n||null===(e=n.target)||void 0===e||null===(i=e.files)||void 0===i?void 0:i.item(0);console.log(t),s.readAsDataURL(t),S(t),s.addEventListener("load",(function(n){var e;tn((function(n){return!0})),g(null===(e=n.target)||void 0===e?void 0:e.result)}))}}),(0,T.jsx)("img",{src:L,alt:"camera-icon",style:{width:25,height:25,color:"#fff"}})]})]}),(0,T.jsxs)("div",{className:"user-inform",children:[(0,T.jsxs)(k,{variant:"h5",children:[o,Number(null===r||void 0===r?void 0:r.level)>2&&(0,T.jsx)(O.pl0,{})]}),(0,T.jsxs)("div",{className:"user-inform__address",children:[(0,T.jsxs)("div",{className:"user-inform__address__detail",children:[(0,T.jsx)("img",{src:z,alt:"address-icon",style:{width:20,height:20,marginRight:10}}),(0,T.jsx)(v.Z,{variant:"body1",children:"Da Nang, Viet Nam, "})]}),(0,T.jsxs)("div",{className:"user-inform__address__detail",children:[(0,T.jsx)("img",{src:C,alt:"address-icon",style:{width:25,height:25,marginRight:10}}),(0,T.jsx)(v.Z,{variant:"body1",children:"Joined January 2020"})]})]})]})]}),a&&en&&(0,T.jsx)(N,{onClick:function(){_&&i.mutate(_),H&&t.mutate(H),tn((function(n){return!1}))},children:"Save Changes"}),a?(0,T.jsx)(P,{onClick:function(){return e("/profile/settings")},children:"Edit Profile"}):(0,T.jsxs)(P,{onClick:rn,children:[(0,T.jsx)(I.tOv,{style:{marginRight:"10px"}})," Message"]})]})]})},B=i(31303),Q=i(18489),Y=i(54641),G=i(48119);var H=i.p+"static/media/postcard.b421c3063a5885b73bf728cd1495239b.svg";var K=i.p+"static/media/note.a8518ebdf65818e6c40c7698d4c707f2.svg";var X=i.p+"static/media/projects.3f338794c45430cf4bf33fcd970a0537.svg";var q=i.p+"static/media/star.15c3c9fe80430427f13264ee15d27600.svg";var $,nn,en,tn,rn,an,on,sn,ln,dn,cn,un=i.p+"static/media/location.ef9d2efa382ff6f9cbe96db0a8b07d99.svg",gn=g.ZP.div($||($=(0,c.Z)(['\n  max-width: 40%;\n  background-color: "#000";\n\n  .review-title {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    font-style: normal;\n    font-weight: 700;\n    margin: 2em 0 1em;\n  }\n\n  .organization-title {\n    font-weight: 700;\n    margin: 2em 0 1em;\n  }\n']))),pn=g.ZP.div(nn||(nn=(0,c.Z)(['\n  max-width: 60%;\n  background-color: "#000";\n\n  .header {\n    display: flex;\n    justify-content: space-evenly;\n    font-size: 1.5em;\n    margin-bottom: 1.5em;\n    background-color: var(--background-light);\n  }\n']))),hn=g.ZP.div(en||(en=(0,c.Z)(["\n  background-color: rgba(255, 255, 255, 0.7);\n  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);\n  border-radius: 10px;\n"]))),fn=(0,g.ZP)(hn)(tn||(tn=(0,c.Z)(["\n  padding: 1.3em 0em;\n  padding-right: 3em;\n"]))),mn=g.ZP.div(rn||(rn=(0,c.Z)(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  margin: 1em 10em 1em 1em;\n\n  img {\n    width: 25px;\n    height: 25px;\n    margin-right: 0.6em;\n  }\n\n  font-family: Poppins;\n  font-size: 24px;\n  font-style: normal;\n  font-weight: 300;\n  line-height: 36px;\n"]))),xn=(0,g.ZP)(hn)(an||(an=(0,c.Z)(["\n  padding: 1em 1em;\n\n  .review-container__header {\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    margin-bottom: 3em;\n\n    &__reviews-number {\n      font-style: normal;\n      font-weight: 400px;\n      line-height: 28px;\n      letter-spacing: 0em;\n    }\n\n    &__review-link {\n      font-family: Roboto;\n      font-weight: 500px;\n      line-height: 35px;\n      letter-spacing: 0em;\n      cursor: pointer;\n    }\n  }\n\n  .review-container__review-list {\n    max-height: 550px;\n    overflow-y: auto;\n  }\n  .review-container__review-list::-webkit-scrollbar {\n    width: 20px;\n  }\n\n  .review-container__review-list::-webkit-scrollbar-track {\n    background-color: #e4e4e4;\n    border-radius: 100px;\n  }\n\n  .review-container__review-list::-webkit-scrollbar-thumb {\n    border-radius: 100px;\n    border: 5px solid transparent;\n    background-clip: content-box;\n    background-color: #8070d4;\n  }\n"]))),vn=g.ZP.div(on||(on=(0,c.Z)(["\n  position: relative;\n  border: 0.2px solid rgba(0, 0, 0, 0.3);\n  margin-bottom: 2em;\n  margin-right: 1em;\n  border-radius: 10px;\n  background: #ffffff;\n\n  .review__header__stars {\n    position: absolute;\n    top: 10px;\n    right: 10px;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n  }\n\n  .review__comment {\n    margin-left: 2em;\n    font-weight: 400;\n  }\n"]))),bn=(0,g.ZP)(hn)(sn||(sn=(0,c.Z)(["\n  padding: 1em 1em;\n  padding-bottom: 0.5em;\n\n  .organization-container__header {\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    margin-bottom: 3em;\n\n    &__organizations-number {\n      font-style: normal;\n      font-weight: 400px;\n      line-height: 28px;\n      letter-spacing: 0em;\n    }\n\n    &__organizations-link {\n      font-weight: 500px;\n      line-height: 35px;\n      letter-spacing: 0em;\n      cursor: pointer;\n    }\n  }\n"]))),_n=g.ZP.div(ln||(ln=(0,c.Z)(["\n  position: relative;\n  border: 0.2px solid rgba(0, 0, 0, 0.3);\n  margin-bottom: 2em;\n  border-radius: 10px;\n  background: #ffffff;\n\n  .organization__role {\n    position: absolute;\n    top: 1.5em;\n    right: 1em;\n    font-weight: 400;\n    line-height: 28px;\n\n    /* Dark 70 */\n    color: rgba(0, 0, 0, 0.7);\n  }\n\n  .organization__location {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n\n    &__icon {\n      width: 15px;\n      height: 15px;\n      margin-right: 2px;\n    }\n\n    &__address {\n      font-weight: 200;\n      letter-spacing: 0em;\n    }\n  }\n"]))),wn=i(24e3),Zn=i(86948),jn=i(22284),yn=i(11822),kn=i.n(yn),Pn=g.ZP.div(dn||(dn=(0,c.Z)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  width: 100%;\n  margin-top: 3em;\n"]))),Nn=function(n){var e,i=u.useState({uid:n.uid,page:1,size:8}),t=(0,h.Z)(i,2),r=t[0],a=t[1],o=u.useState([]),s=(0,h.Z)(o,2),l=s[0],d=s[1],c=function(n){var e=n.uid,i=n.page,t=n.size;return(0,U.useQuery)(["QUERY_LIST_POST_WITH_UID",e,i,t],(function(){return E.ZP.get(wn.V,"/user/list",{params:n})}),{retry:1,retryOnMount:!1,refetchOnWindowFocus:!1})}((0,Q.Z)({},r)),g=u.useState(!0),p=(0,h.Z)(g,2),f=p[0],m=p[1],x=function(n){d(l.filter((function(e){return kn()(e.post_id)!==n})))};u.useEffect((function(){var n,e;c.data&&f&&d([].concat((0,B.Z)(l),(0,B.Z)((null===(e=c.data)||void 0===e?void 0:e.list)||[])));c.data&&(null===(n=c.data)||void 0===n?void 0:n.total)<=r.page*r.size?m(!1):m(!0)}),[r.page,null===(e=c.data)||void 0===e?void 0:e.list]);return(0,T.jsxs)(Pn,{children:[(0,T.jsxs)(gn,{children:[(0,T.jsxs)(fn,{children:[(0,T.jsxs)(mn,{children:[(0,T.jsx)("img",{src:H}),(0,T.jsx)(v.Z,{children:"2 posts published"})]}),(0,T.jsxs)(mn,{children:[(0,T.jsx)("img",{src:K}),(0,T.jsx)(v.Z,{children:"10 comments written"})]}),(0,T.jsxs)(mn,{children:[(0,T.jsx)("img",{src:X}),(0,T.jsx)(v.Z,{children:"5 projects joined"})]})]}),(0,T.jsxs)(v.Z,{variant:"h5",className:"review-title",children:["Reviews (4.5"," ",(0,T.jsx)("img",{src:q,alt:"star-icon",style:{width:30,height:30,paddingLeft:2,paddingBottom:5}}),")"]}),(0,T.jsxs)(xn,{children:[(0,T.jsxs)("div",{className:"review-container__header",children:[(0,T.jsx)(v.Z,{variant:"body1",className:"review-container__header__reviews-number",children:"15 reviews"}),(0,T.jsx)(v.Z,{variant:"h6",className:"review-container__header__review-link",children:"Review"})]}),(0,T.jsx)("div",{className:"review-container__review-list",children:Array(8).fill(null).map((function(n){return(0,T.jsxs)(vn,{children:[(0,T.jsx)(Y.Z,{avatar:(0,T.jsx)(G.Z,{alt:"Remy Sharp",src:"https://1.bigdata-vn.com/wp-content/uploads/2021/11/1636289811_593_Tai-Ngay-505-Anh-Avatar-Anime-dep-de-thuong-nhat.jpg"}),title:(0,T.jsx)(v.Z,{variant:"body1",style:{fontWeight:600},children:"Anna Scot"}),subheader:"Jan 30"}),(0,T.jsxs)("div",{className:"review__header__stars",children:[(0,T.jsx)(v.Z,{variant:"body1",children:"4.5"}),(0,T.jsx)("img",{src:q,style:{width:25,height:25,marginBottom:4,paddingLeft:3}})]}),(0,T.jsx)(v.Z,{variant:"body1",className:"review__comment",children:"Great person!"})]})}))})]}),(0,T.jsx)(v.Z,{variant:"h5",className:"organization-title",children:"Organizations"}),(0,T.jsxs)(bn,{children:[(0,T.jsxs)("div",{className:"organization-container__header",children:[(0,T.jsx)(v.Z,{variant:"body1",className:"organization-container__header__organizations-number",children:"3 organizations"}),(0,T.jsx)(v.Z,{variant:"h6",className:"organization-container__header__organizations-link",children:"See all"})]}),Array(3).fill(null).map((function(n){return(0,T.jsxs)(_n,{children:[(0,T.jsx)(Y.Z,{avatar:(0,T.jsx)(G.Z,{alt:"organization-image",src:"https://logos-world.net/wp-content/uploads/2020/10/UNICEF-Logo.png"}),title:(0,T.jsx)(v.Z,{variant:"body1",style:{fontWeight:600},children:"UNICEF"}),subheader:(0,T.jsxs)("div",{className:"organization__location",children:[(0,T.jsx)("img",{src:un,alt:"location-icon",className:"organization__location__icon"}),(0,T.jsx)(v.Z,{className:"organization__location__address",children:"New York City, USA"})]})}),(0,T.jsx)(v.Z,{variant:"body1",className:"organization__role",children:"Admin"})]})}))]})]}),0!==l.length?(0,T.jsx)(pn,{children:(0,T.jsx)(Zn.Z,{loader:(0,T.jsx)(F.Z,{}),next:function(){return setTimeout((function(){a((function(n){return(0,Q.Z)((0,Q.Z)({},n),{},{page:n.page+1})}))}),2e3)},hasMore:f,refreshFunction:c.refetch,dataLength:l.length,children:l.map((function(n,e){return(0,u.createElement)(jn.r,(0,Q.Z)((0,Q.Z)({},n),{},{key:e,handleDeletePost:x}))}))})}):!c.isLoading&&(0,T.jsx)("h1",{style:{marginRight:280},children:"There's no post"})]})},zn=i(50203),Cn=i(17778),Sn=i(64605),Rn=g.ZP.div(cn||(cn=(0,c.Z)(["\n  width: 100%;\n  height: 100%;\n  padding: 2% 5em;\n"]))),Ln=function(){var n=(0,Sn.sJ)(Cn.K),e=(0,D.UO)().uid,i=n.uid===e,t=(0,zn.n)();return u.useEffect((function(){t.mutate({uid:e}),t.isSuccess?console.log("Data:",t):console.log("Error: ",t.error)}),[e]),void 0===t.data?(0,T.jsx)(F.Z,{cover:"content"}):(0,T.jsxs)(Rn,{children:[(0,T.jsx)(V,{isCurrentUser:i,profileInfo:t.data}),(0,T.jsx)("hr",{className:"solid"}),(0,T.jsx)(Nn,{uid:e})]})}}}]);