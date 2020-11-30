// 导入自己需要的组件
import {Avatar,Carousel,CarouselItem,Loading,Message,MessageBox,Container,Header,Main,Footer,Row,Col,Input,Button,Form,
    FormItem,Image,Tabs,TabPane,Radio, RadioGroup,RadioButton,Dialog,Select,Option,Table,TableColumn,DatePicker,
    Scrollbar,Menu,Submenu,MenuItem,Breadcrumb, BreadcrumbItem, Tooltip, Dropdown, DropdownItem, DropdownMenu, Pagination, Card, Alert, Tag, Tree, Checkbox, CheckboxGroup} from 'element-ui'
const element = {
  install: function (Vue) {
    Vue.use(Avatar)
    Vue.use(Carousel).use(CarouselItem)
    Vue.use(Container)
    Vue.use(Header)
    Vue.use(Main)
    Vue.use(Footer)
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Input)
    Vue.use(Button)
    Vue.use(Form).use(FormItem)
    Vue.use(Image)
    Vue.use(Tabs).use(TabPane)
    Vue.use(Radio);
    Vue.use(RadioGroup);
    Vue.use(RadioButton);
    Vue.use(Dialog);
    Vue.use(Select);
    Vue.use(Option);
    Vue.use(Table);
    Vue.use(TableColumn);
    Vue.use(DatePicker);
    Vue.use(Scrollbar);
    Vue.use(Menu);
    Vue.use(Submenu);
    Vue.use(MenuItem);
    Vue.use(Breadcrumb).use(DropdownMenu).use(BreadcrumbItem);
    Vue.use(Tooltip)
    Vue.use(Dropdown).use(DropdownItem)
    Vue.use(Pagination)
    Vue.use(Loading);
    Vue.use(Card);
    Vue.use(Alert);
    Vue.use(Tag);
    Vue.use(Tree);
    Vue.use(Checkbox).use(CheckboxGroup);
    Vue.prototype.$confirm = MessageBox.confirm;
    Vue.prototype.$notify = Notification;
    Vue.prototype.$message = Message;
  }
}
export default element
