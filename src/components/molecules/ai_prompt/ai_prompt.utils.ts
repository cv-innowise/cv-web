export const getProjectPrompt = (description: string, name?: string, domain?: string) => {
  return `
    Write app technical description based on the following input:
    "${description}".
    Application name is ${name || '[Name]'}. Don't use this name in every sentence.
    Try to rephrase the name.
    It is connected with ${domain || '[Domain]'} area.
    Describe which problems it can solve.
    Include essential and popular features that are used in this area. Don't use the word "essential" and "popular".
    Your response length should be less than 1000 characters.
  `
}

export const getCvPrompt = (description: string, name?: string, education?: string) => {
  return `
    Write resume summary based on the following input:
    "${description}".
    Position role is ${name || '[Name]'}. 
    Person has education in ${education || '[Education]'}.
    Describe overall experience in this role.
    Provide a lot of professional responsibilities and achievements. Pay attention to details.
    Your response length should be less than 1000 characters.
  `
}

export const getCvProjectResponsibilitiesPrompt = (
  responsibilities: string,
  domain?: string,
  description?: string,
  environment?: string[]
) => {
  return `
    Write a list of 3-5 professional responsibilities during the project experience.
    Use the following user input as a reference: "${responsibilities}".
    The project area is ${domain || '[Domain]'}.
    Your response length should be less than 1000 characters.
    Pay attention to details. Describe how "${environment?.join(', ')}" 
    skills were used in terms of what was achieved to bring value to the product.
    You can use this project description as a context: "${description}".
    Format each responsibility to start with * and end with "\n" new line symbol. 
  `
}

export const getSkillsPrompt = (department?: string, position?: string) => {
  return `
    Write a list of most popular skills and technologies.
    Pick suitable for this role and position: ${department} ${position}.
    Format this list using "," separator.
  `
}
