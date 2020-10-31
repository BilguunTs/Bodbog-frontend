import React, { Component, createContext } from "react";
import jwtDecode from "jwt-decode";
import { Defaults } from "../config";

export const Contextulize = createContext();
export class ContextWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
      accessToken: "",
      expiration: 0,
      user: Defaults.user,
      profile: Defaults.profile,
      redirect: false,
      herd: Defaults.herd,
      address: Defaults.address,
      deleteTarget: "",
      direction_of_list: "desc",
      image: {
        path: null,
        preview: null,
      },
      modal: {
        type: null,
        isOn: false,
        data: null,
        submit: false,
      },
    };
  }

  componentDidMount() {
    if (localStorage["token"] === "undefined") {
      localStorage.removeItem("token");
    }
    if (localStorage.getItem("token")) {
      const decodedToken = jwtDecode(localStorage.getItem("token"));

      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");

        this.setState({
          ...this.state,
          isAuth: false,
          redirect: false,
          user: Defaults.user,
        });
      } else {
        const { id, ...rest } = decodedToken;
        this.setState({
          ...this.state,
          isAuth: true,
          user: { _id: decodedToken.id, ...rest },
        });
      }
    }
  }

  componentDidUpdate(preProps, preState) {
    if (preState.isAuth !== this.state.isAuth && this.state.isAuth === true) {
      this.setState({ ...this.state, redirect: true });
    }
  }

  setHerd = (obj) => {
    this.setState({ ...this.state, herd: obj });
  };
  updateHerd = (name, value) => {
    this.setState({
      ...this.state,
      herd: { ...this.state.herd, [name]: value },
    });
  };
  updateAddress = (name, value) => {
    this.setState({
      ...this.state,
      address: { ...this.state.address, [name]: value },
    });
  };
  clearHerd = () => {
    this.setState({ ...this.state, herd: Defaults.herd });
  };
  updateHerdAge = (value) => {
    this.setState({ ...this.state, herd: { ...this.state.herd, age: value } });
  };
  updateProfile = (name, value) => {
    this.setState({
      ...this.state,
      profile: { ...this.state.profile, [name]: value },
    });
  };
  setDeleteTarget = (ID) => {
    this.setState({ ...this.state, deleteTarget: ID });
  };

  openModal = (type, data) => {
    if (!type) return;
    this.setState({
      ...this.state,
      modal: { type, isOn: true, data },
    });
  };
  onEditHerdModal = (type, herddata) => {
    this.setState({
      ...this.state,
      modal: { type, isOn: true },
      herd: { ...herddata },
    });
  };
  closeModal = () => {
    this.setState({ ...this.state, modal: { type: null, isOn: false } });
  };
  resolveModal = (type) => {
    return new Promise((resolve, reject) => {
      if (!type) {
        return reject("no type");
      } else if (type === "address") {
        return resolve({ ...this.state.address });
      }
      return resolve("I will resolve if there is args");
    });
  };
  setListDirection = (type) => {
    if (type !== "asc" || type !== "desc") return;
    this.setState({ ...this.state, direction_of_list: type });
  };
  render() {
    return (
      <Contextulize.Provider
        value={{
          state: this.state,
          clearHerd: () => this.clearHerd(),
          updateHerd: (n, v) => this.updateHerd(n, v),
          updateHerdAge: (v) => this.updateHerdAge(v),
          updateProfile: (n, v) => this.updateProfile(n, v),
          updateAddress: (n, v) => this.updateAddress(n, v),
          onEditHerdModal: (t, o) => this.onEditHerdModal(t, o),
          setHerd: (obj) => this.setHerd(obj),
          setListDirection: (d) => this.setListDirection(d),
          setDeleteTarget: (id) => this.setDeleteTarget(id),
          openModal: (t, d) => this.openModal(t, d),
          closeModal: () => this.closeModal(),
          onFileChange: (e) => this._onFileChange(e),
          clearFile: () => this._clearFile(),
          logout: () => this._logout(),
          setSession: (data) => this._setSession(data),
        }}
      >
        {this.props.children}
      </Contextulize.Provider>
    );
  }
  _onFileChange = (e) => {
    let preview = URL.createObjectURL(e.target.files[0]);
    let path = e.target.files[0];
    this.setState({ ...this.state, image: { path, preview } });
  };
  _clearFile = () => {
    return this.setState({
      ...this.state,
      image: { path: null, preview: null },
    });
  };
  _setSession(data) {
    localStorage.setItem("token", data.token);
    const user = {
      _id: data.id,
      email: data.email || "",
      phonenumber: data.phonenumber,
      firstname: data.firstname || "",
      lastname: data.lastname || "",
      accesslevel: 1,
    };
    this.setState({
      ...this.state,
      isAuth: true,
      accessToken: data.token,
      expiration: 1,
      user,
    });
  }
  _logout = () => {
    localStorage.removeItem("token");
    this.setState({
      ...this.state,
      isAuth: false,
      accessToken: "",
      redirect: false,
      user: Defaults.user,
    });
    window.location.reload();
  };
}
export function connect(Component) {
  return class WrapperComponent extends React.Component {
    render() {
      return (
        <Contextulize.Consumer>
          {(store) => <Component {...this.props} context={store} />}
        </Contextulize.Consumer>
      );
    }
  };
}
