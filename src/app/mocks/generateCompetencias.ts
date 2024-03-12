const getCompetencesFromArray = (numOfCompetences:number) => {
    const habilities = ['habilidade1', 'habilidade2', 'habilidade3']
    const competences = []
    for (let i = 0; i < numOfCompetences; i++) {
      const habilidades = habilities.map(hability => `${hability}.${i}`)
      const competence = {id:i, descricao:`Competência ${i}`, habilidades: habilidades}
      competences.push(competence)
    }
    return competences
  }

export default getCompetencesFromArray