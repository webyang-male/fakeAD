import React from 'react';
import {
    Button, Modal, Radio, InputNumber,
} from 'antd';
import { ThemeContext } from 'context/theme';
import { EditOutlined } from '@ant-design/icons';
import './style.scss';

interface IProps {
    name: string;
    desc: string;
    type: number;
    btnStatus: boolean;
    // eslint-disable-next-line react/require-default-props
    cost?: number;
    // eslint-disable-next-line react/require-default-props
    budget?: number;
    // eslint-disable-next-line react/require-default-props
    onEnter?: () => void;
}

interface IStates {
    editModalShow: boolean;
    budgetOption: number;
    budgetValue: number;
}

class ProCardItem extends React.Component<IProps, IStates> {
    state = {
        editModalShow: false,
        budgetOption: 1,
        budgetValue: 0,
    }

    openEditBudgetModal = () => {
        this.setState({
            editModalShow: true,
        });
    }

    handleBudgetOk = () => {
        this.setState({
            editModalShow: false,
        });
    }

    handleBudgetCancel = () => {
        this.setState({
            editModalShow: false,
        });
    }

    handleRadioChange = (optionValue: number) => {
        this.setState({
            budgetOption: optionValue,
        });
    }

    handleBudgetChange = (newValue: number) => {
        this.setState({
            budgetValue: newValue,
        });
    }

    handleClick = () => {
        const { onEnter } = this.props;
        if (onEnter) {
            onEnter();
        }
    }

    render() {
        const {
            name, desc, type, btnStatus, cost = 0, budget = 0,
        } = this.props;
        const { editModalShow, budgetOption, budgetValue } = this.state;
        const radioStyle = {
            display: 'block',
            height: '35px',
            lineHeight: '35px',
        };
        return (
            <div className="pro-card-item-component-box">
                <div className="name">{name}</div>
                {
                    type === 1 ? (
                        <div>
                            <div className="wrap">
                                <div className="label">??????(???)</div>
                                <div className="value">{cost}</div>
                            </div>
                            <div className="wrap">
                                <div className="label">?????????(???)</div>
                                <div className="value">
                                    {budget}
                                    <EditOutlined
                                        onClick={this.openEditBudgetModal}
                                        style={{ marginLeft: 5 }}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="desc">{desc}</div>
                    )
                }
                {
                    btnStatus ? (
                        <div className="btn-wrap">
                            <Button
                                type="primary"
                                size="small"
                                onClick={this.handleClick}
                            >
                                ??????
                            </Button>
                        </div>
                    ) : (
                        <div className="btn-wrap">
                            <Button type="primary" size="small" disabled>????????????</Button>
                        </div>
                    )
                }
                <Modal
                    title={`${name}????????????`}
                    visible={editModalShow}
                    onOk={this.handleBudgetOk}
                    onCancel={this.handleBudgetCancel}
                    okText="??????"
                    cancelText="??????"
                    className="budget-modal"
                    width={700}
                >
                    <Radio.Group onChange={(e) => { this.handleRadioChange(e.target.value); }} value={budgetOption}>
                        <Radio value={1} style={radioStyle}>???????????????</Radio>
                        <Radio value={2} style={radioStyle}>
                            <span>??????</span>
                            <span className="radio-hint">?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????</span>
                        </Radio>
                    </Radio.Group>
                    {
                        budgetOption === 2 && (
                            <div className="input-number">
                                <InputNumber size="small" min={1} max={100000} defaultValue={budgetValue} onChange={(newValue) => { this.handleBudgetChange(newValue); }} />
                                <span className="unit">???</span>
                                <span className="hint">???????????????????????????????????????????????????50???</span>
                            </div>
                        )
                    }
                    <div className="budget-hint">?????????????????????????????????30?????????????????????????????????????????????????????????</div>
                </Modal>
            </div>
        );
    }
}

ProCardItem.contextType = ThemeContext;

export default ProCardItem;
