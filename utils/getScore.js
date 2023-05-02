const refreshScore = (model, id) => {
    let score = 0
    return model.findById(id)
        .select({ votes: 1 })
        .populate("votes", 'vote')
        .then(({ votes }) => {
            const votesCount = votes.reduce((acc, elm) => {
                const { vote } = elm
                if (vote === 'up') acc++
                return acc
            }, 0)
            const result = (votesCount ? ((votesCount / votes.length) * 100).toFixed(0) : 0)
            score = result
            return model.findByIdAndUpdate(id, { score }, { new: true })
        })
        .catch(err => res.json(err))
}

const getScore = votes => {


    const votesCount = votes.reduce((acc, elm) => {
        const { vote } = elm
        if (vote === 'up') acc++
        return acc
    }, 0)
    const result = (votesCount ? ((votesCount / votes.length) * 100).toFixed(0) : 0)
    return result


}

module.exports = { refreshScore, getScore }