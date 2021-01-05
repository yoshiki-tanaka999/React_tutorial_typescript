// import { fchmod } from 'fs';
import React from 'react';
import ReactDOM from 'react-dom';
// import { idText } from 'typescript';
import './index.css';
// import App from './App';

// 全体の型の定義
type FeeClassification = {
  name: string;
  description: string;
  unitPrice: number;
  numOfPeople: number;
  totalPrice: number;
}

// Detailコンポーネントに適用するprops型の定義
type DetailProps = {
  classification: FeeClassification;
  onNumOfPeopleChange: (num: number) => void;
}

type SummaryProps = {
  numOfPeople: number;
  totalAmount: number;
}

// 親コンポーネントのstateの型づけ
type AdmissionFeeCalculatorState = {
  feeClassifications: FeeClassification[];
}

// React.FC(FC = function component)
const Detail: React.FC<DetailProps> = props => {
  const onNumOfPeopleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const num: number = Number(e.target.value);
    props.onNumOfPeopleChange(num);
  }
  return (
    <div >
      <div className="classification-name">{props.classification.name}</div>
      <div className="description">{props.classification.description}</div>
      <div className="unit-price">{props.classification.unitPrice}</div>
      <div className="num-people">
        <select value={props.classification.numOfPeople}
          onChange={ e => onNumOfPeopleChange(e) }>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <span>名</span>
      </div>
    </div>
  );
}

const Summary: React.FC<SummaryProps> = props => {
  return (
    <div>
      <div className="party">
        <input type="text" className="party" value={props.numOfPeople} />
        <span>名様</span>
      </div>
      <div className="total-amount">
        <span>合計</span>
        <input type="text" className="total-amount" value={props.totalAmount} />
        <span>円</span>
      </div>
    </div>
  );
}


class AdmissionFeeCalculator extends React.Component<{}, AdmissionFeeCalculatorState> {
  constructor(props: {}) {
    super(props);

    // hogehoge : 型定義が、お作法みたいだね
    const adults: FeeClassification = {
      name: '大人',
      description: '',
      unitPrice: 1000,
      numOfPeople: 0,
      totalPrice: 0
    };

    const students: FeeClassification = {
      name: '学生',
      description: '中学生・高校生',
      unitPrice: 700,
      numOfPeople: 0,
      totalPrice: 0
    };

    const children: FeeClassification = {
      name: '子ども',
      description: '小学生',
      unitPrice: 300,
      numOfPeople: 0,
      totalPrice: 0
    };

    const infants: FeeClassification = {
      name: '幼児',
      description: '未就学',
      unitPrice: 0,
      numOfPeople: 0,
      totalPrice: 0
    };

    this.state = { feeClassifications: [adults, students, children, infants] };
  }

    handleNumOfPeopleChange(idx: number, num: number) {
      const currentFC = this.state.feeClassifications[idx];
      const newTotalPrice = currentFC.unitPrice * num;
      // 人数と合計額以外は既存の値をコピー
      const newFC: FeeClassification =
        Object.assign({}, currentFC, { numOfPeople: num, totalPrice: newTotalPrice });
      // 新たな配列を生成
      const feeClassifications = this.state.feeClassifications.slice();
      feeClassifications[idx] = newFC;

      // stateの更新
      this.setState({ feeClassifications: feeClassifications });
    }

  render() {
    const detailsJsx = this.state.feeClassifications.map((fc, idx) => {
      return (
        <Detail key={idx.toString()} classification={fc} 
          onNumOfPeopleChange={n => this.handleNumOfPeopleChange(idx, n)}
        />
      );
    });

    const numOfPeople = this.state.feeClassifications
      .map(fc => fc.numOfPeople).reduce((p, c) => p + c);
    const totalAmount = this.state.feeClassifications
      .map(fc => fc.totalPrice).reduce((p, c) => p + c);

    return (
      <>
        {detailsJsx}
        <Summary numOfPeople={numOfPeople} totalAmount={totalAmount}/>
      </>
    );
  }
}

const App: React.FC = () => {
return (
  <div className="main">
    <AdmissionFeeCalculator />
  </div>
);
}

ReactDOM.render(<App />, document.getElementById('root'));
