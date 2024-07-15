import GlobalFooter from '../../../components/global-footer/GlobalFooter';
import GlobalNavbar from '../../../components/global-navbar/GlobalNavbar';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../../../components/scroll-to-top/ScrollToTop';
import ChatWidget from '../chat-widget/ChatWidget';

const currentUser = {
  id: "1",
  name: "Alice",
  email: "alice@example.com",
  photoUrl: "https://example.com/photo-alice.jpg",
  welcomeMessage: "Hey there!"
};

const otherUser = {
  id: "2",
  name: "Bob",
  email: "bob@example.com",
  photoUrl: "https://example.com/photo-bob.jpg",
  welcomeMessage: "Hello!"
};

const BaseLayout = () => {
  return (
    <>
      <GlobalNavbar />
      <ScrollToTop />
      <Outlet />
      <ChatWidget user={currentUser} otherUser={otherUser} />
      <GlobalFooter />
    </>
  );
};

export default BaseLayout;
