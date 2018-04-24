import React, { PureComponent } from 'react'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc'
import Infinite from 'react-infinite'
import api from 'app/helpers/ApiHOC'
import debounce from 'lodash/debounce'
import Row from './Row'
import Spinner from 'common/Spinner/Spinner'

// const SortableItem = SortableElement(({ value }) => (
//     <Row
//       style={{
//         backgroundColor: '#fff',
//         overflow: 'hidden',
//       }}
//       value={value}
//     />
//   )
// )
const SortableItem = ({ value }) => (
  <Row
    style={{
      backgroundColor: '#fff',
      overflow: 'hidden',
    }}
    id={value.id}
    value={value}
  />
)

const SortableList = SortableContainer(({ items, ...props }) => (
    <Infinite
      useWindowAsScrollContainer
      elementHeight={65}
      infiniteLoadBeginEdgeOffset={200}
      {...props}
    >
      {items.map((value, index) => (
        <SortableItem key={value.id} index={index} value={value} />
      ))}
    </Infinite>
  )
)

@api({
  url: 'questions',
  method: 'GET',
  name: 'questions',
  options: {
    caching: false,
  },
})
export default class QuestionsList extends PureComponent {
  constructor() {
    super()

    this.handleLoadMore = debounce(this.handleLoadMore, 200)
  }

  state = {
    items: [],
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.data.questions && prevState.items.length === 0) {
      return {
        items: nextProps.data.questions.results,
      }
    }

    return null
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { items } = this.state

    this.setState({
      items: arrayMove(items, oldIndex, newIndex),
    })
  }

  handleLoadMore = () => {
    const { data: { questions: { results, cursor }, questionsRefetch } } = this.props

    if (results.length === 0) return null

    questionsRefetch({
      query: {
        lastId: cursor,
      },
    })
      .then(({ results }) => {
        this.setState({
          items: [...this.state.items, ...results]
        })
      })
  }

  elementInfiniteLoad = () => {
    return (
      <Spinner />
    )
  }

  render() {
    const { items } = this.state
    const { data: { questionsLoading } } = this.props

    return (
      <SortableList
        items={items}
        onSortEnd={this.onSortEnd}
        loadingSpinnerDelegate={this.elementInfiniteLoad()}
        isInfiniteLoading={questionsLoading}
        onInfiniteLoad={this.handleLoadMore}
      />
    )
  }
}