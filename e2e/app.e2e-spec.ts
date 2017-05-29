import { SampleChatRoomPage } from './app.po';

describe('sample-chat-room App', () => {
  let page: SampleChatRoomPage;

  beforeEach(() => {
    page = new SampleChatRoomPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
