import AppRoutes from "./components/AppRoutes";
import { Image, Layout } from "antd";
import SideMenu from "./components/sideMenu";
const { Sider, Content, Footer } = Layout;




function App() {
  return (
       <Layout>
          <Sider style={{height:"100vh", backgroundColor:"white"}}>
             <Image  src="https://images.pexels.com/photos/1024359/pexels-photo-1024359.jpeg?auto=compress&cs=tinysrgb&w=600"
               preview={false}
             />
             <SideMenu  />
          </Sider>
          <Layout>
              <Content >
                   <AppRoutes  />
              </Content>
              <Footer style={{textAlign:"center", backgroundColor:"white"}}>
                  Ubeats restaurant dashboard
              </Footer>
          </Layout>
       </Layout>
     
  );
}



export default App;
