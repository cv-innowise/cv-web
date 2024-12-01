export const getProjectPrompt = (description: string, name?: string, domain?: string) => {
  return `
    Write app technical description based on the following input:
    "${description}".
    Application name is ${name || '[Name]'}. Don't use this name in every sentence.
    Try to rephrase the name.
    It is connected with ${domain || '[Domain]'} area.
    Describe which problems it can solve.
    Include essential and popular features that are used in this area. Don't use the word "essential" and "popular".
    Your response length should be less than 500 characters.
  `
}

export const getCvPrompt = (description: string, name?: string, education?: string) => {
  return `
    Write resume summary based on the following input:
    "${description}".
    Position role is ${name || '[Name]'}. 
    Person has education in ${education || '[Education]'}.
    Describe overall experience in this role. Provide a lot of professional responsibilities and achievements. Pay attention to details.
    Your response length should be less than 1000 characters.
  `
}
