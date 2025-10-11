import { addNavBtn } from './navBtn/navBtn';
import { addSidebar } from './sidebar/sidebar';
import { addTitleBox } from './infoboxes/titlebox';
import { addLoadingScreen } from './loading/loadingScreen';

export function setupComponents() {
  addLoadingScreen();
  addNavBtn();
  addSidebar();
  addTitleBox();
}
