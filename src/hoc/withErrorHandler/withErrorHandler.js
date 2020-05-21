import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrapComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        // componentDidMount --> call after all child component render
        // componnentWillMount --> call before child component render
        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use((req) => {
                this.setState({
                    error: null
                });
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({
                    error
                });
            });
        }
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        errorConfirmHandler = () => {
            this.setState({
                error: null
            });
        }
        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={() => this.errorConfirmHandler()}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrapComponent {...this.props} />

                </Aux>
            )
        }
    }
}
export default withErrorHandler;