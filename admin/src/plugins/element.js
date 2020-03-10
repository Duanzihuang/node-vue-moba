import Vue from 'vue'
import {
  Main,
  Button,
  Aside,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Container,
  Header,
  Table,
  TableColumn,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Form,
  FormItem,
  Input,
  Message,
  MessageBox,
  Select,
  Option,
  Upload,
  Tabs,
  TabPane,
  Rate,
  Row,
  Col
} from 'element-ui'

Vue.use(Main)
Vue.use(Button)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Container)
Vue.use(Header)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Upload)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Rate)
Vue.use(Row)
Vue.use(Col)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
