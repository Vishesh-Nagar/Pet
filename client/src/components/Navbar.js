import React, { Component } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Button
} from 'reactstrap';
import logo from '../images/logo_fetch.jpeg'
import '../App.css'
import { Link } from 'react-router-dom';
import { connect, PromiseState } from 'react-refetch'
import axios from 'axios';
import Time from 'react-time';
import Date from 'react-date';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink as RRNavLink } from 'react-router-dom';

export class Navbar2 extends Component {

    state = {
        isOpen: false,
        bg: 'beige',
        tg: '#e75480',
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    prev = null
    prevnotif = null
    prevnotifsize = null

    componentDidUpdate() {
        if(this.props.unread_messages.value!=this.prev && this.prev!=null) {
            if(this.props.unread_messages.value>0)
            {
                if(this.props.unread_messages.value == 1)
                toast.info(`New messages from ${this.props.unread_messages.value} chat`)
                else
                toast.info(`New messages from ${this.props.unread_messages.value} chats`)
            }
            
        }
        if(this.props.notifs.value!=null && this.props.notifs.value.length>0 && JSON.stringify(this.props.notifs.value[0])!=JSON.stringify(this.prevnotif) && this.prevnotif!=null)
        {
            if(this.prevnotifsize<this.props.notifs.value.length){
                if(this.props.notifs.value[0].type == 'foundpet')
                toast.info(`Looks like ${this.props.notifs.value[0].user_name} has found your pet!`)
                else if(this.props.notifs.value[0].type == 'donation')
                toast.success(`${this.props.notifs.value[0].user_name} made a donation to your drive!`)
                else if(this.props.notifs.value[0].type == 'apply')
                toast.warning(`${this.props.notifs.value[0].user_name} applied for adoption on your post!`)
                else if(this.props.notifs.value[0].type == 'donated')
                toast.success(`You have successfully donated!`)
            }
        }
        this.prev = this.props.unread_messages.value
        if(this.props.notifs.value!=null && this.props.notifs.value.length>0)
        this.prevnotif = this.props.notifs.value[0]
        if(this.props.notifs.value!=null)
        this.prevnotifsize = this.props.notifs.value.length
    }

    render() {
        return (
            <div>
                <Navbar fixed="top" color="white" light expand="md" style={{ boxShadow: `0px 0px 5px rgba(0, 0, 0, 0.2)` }}>
                    <NavbarBrand href="/"><img src={logo} style={{ marginLeft: 15, marginRight: 10, marginTop: -8, height: 45 }} /></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem style={{ marginRight: 25 }}>
                                <NavLink tag={RRNavLink} to="/adopt" style={{fontFamily: 'muli', fontSize: '16px'}} activeStyle={{fontWeight: 510, fontFamily: 'muli', fontSize: '16px', backgroundColor:'white'}} exact={true}>Adopt</NavLink>
                            </NavItem>
                            <NavItem style={{ marginRight: 25 }}>
                                <NavLink tag={RRNavLink} to="/donations" style={{fontFamily: 'muli', fontSize: '16px'}} activeStyle={{fontWeight: 510, fontFamily: 'muli', fontSize: '16px', backgroundColor:'white'}} exact={true}>Donation Drives</NavLink>
                            </NavItem>
                            <NavItem style={{ marginRight: 25 }}>
                                <NavLink tag={RRNavLink} to="/lostpet" style={{fontFamily: 'muli', fontSize: '16px'}} activeStyle={{fontWeight: 510, fontFamily: 'muli', fontSize: '16px', backgroundColor:'white'}} exact={true}>Lost a Pet</NavLink>
                            </NavItem>
                            <NavItem style={{ marginRight: 25 }}>
                                <NavLink tag={RRNavLink} to="/foundpet" style={{fontFamily: 'muli', fontSize: '16px'}} activeStyle={{fontWeight: 510, fontFamily: 'muli', fontSize: '16px', backgroundColor:'white'}} exact={true}>Found a Pet</NavLink>
                            </NavItem>
                            
                        </Nav>
                        <NavbarText style={{ marginRight: 30 }}><a href="/profile"><i class="ti-user"></i> {JSON.parse(window.localStorage.getItem('user')).name}</a></NavbarText>
                        <NavbarText style={{ marginRight: 10}}><a href="/chats"><i class="ti-comment"></i>
                            {this.props.unread_messages.value > 0 ?
                                <span style={{ marginLeft: 2, fontSize: 11, color: 'white', backgroundColor: '#45b1e8', borderRadius: '50%' }}>&nbsp;{this.props.unread_messages.value}&nbsp;</span>
                                : null}
                        </a></NavbarText>
                        <UncontrolledDropdown>
                            <DropdownToggle nav style={{ fontFamily: 'muli' }}>
                                <NavbarText style={{ marginRight: 10 }}><a href="#"><i class="ti-bell"></i>{this.props.notifs.value && this.props.notifs.value.length > 0 ?
                                    <span style={{ marginLeft: 2, fontSize: 11, color: 'white', backgroundColor: '#45b1e8', borderRadius: '50%' }}>&nbsp;{this.props.notifs.value.length}&nbsp;</span>
                                    : null}</a>
                                </NavbarText>
                                <DropdownMenu style={{maxHeight: '200px',overflow: 'auto', opacity:'95%'}} className="myColumn1">
                                    {this.props.notifs.value ?
                                        this.props.notifs.value.map((n, i) => {
                                            return (
                                                    <DropdownItem onClick={() => {
                                                        window.localStorage.getItem('user_type') == 'user' ?
                                                            axios.delete(`/api/users/notifications/${JSON.parse(window.localStorage.getItem('user')).id}/${n._id}`):
                                                        axios.delete(`/api/ngo/notifications/${JSON.parse(window.localStorage.getItem('user')).id}/${n._id}`)
                                                    }} tag={Link} to={`profile/${n.user_type}/${n.user_id}`} >
                                                        {n.type == 'foundpet' ? <div>Looks like {n.user_name} has found your pet.</div>:
                                                            n.type == 'donation' ? <div>{n.user_name} made a donation to your drive.</div>:
                                                                n.type == 'apply' ? <div>{n.user_name} applied for adoption on your post.</div>:  
                                                                n.type == 'donated' ? <div>You have successfully donated!</div>:
                                                                
                                                                null}
                                                    <Time style={{ marginLeft: '2px', fontSize: '12px' }} value={n.createdAt} format="DD/MM/YYYY"/>
                                                    <Time style={{ marginLeft: '2px', fontSize: '12px' }} value={n.createdAt} format="HH:mm:ss" />
                                                </DropdownItem>
                                               )
                                        })
                                        : null}
                                </DropdownMenu>
                            </DropdownToggle>
                        </UncontrolledDropdown>

                        
                        <NavbarText style={{ marginRight: 30 }}><a href="/logout"><i class="ti-power-off"></i></a></NavbarText>
                    </Collapse>
                </Navbar>
                <ToastContainer position="top-center" autoClose={3000} />
            </div>
        )
    }
}

export default connect(props => ({
    unread_messages: { url: `../api/messages/unread/${JSON.parse(window.localStorage.getItem('user')).id}`, refreshInterval: 6000 },
    notifs: { url: `../api/${window.localStorage.getItem('user_type')}/notifications/${JSON.parse(window.localStorage.getItem('user')).id}`, refreshInterval: 2000 },
}))(Navbar2)