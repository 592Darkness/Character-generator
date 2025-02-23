document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.getElementById('name');
  const genderInput = document.getElementById('gender');
  const raceInput = document.getElementById('race');
  const ageInput = document.getElementById('age');
  const occupationInput = document.getElementById('occupation');
  const locationInput = document.getElementById('location');
  const customTraitsInput = document.getElementById('custom-traits');
  const backgroundInput = document.getElementById('background');
  const scenarioInput = document.getElementById('scenario');
  const optionalDetailsInput = document.getElementById('optional-details');
  const generateBtn = document.getElementById('generate-btn');
  const promptOutput = document.getElementById('prompt-output');

  generateBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (!name) {
      alert('Please enter a name.');
      return;
    }
    const gender = genderInput.value.trim();
    const raceOptions = Array.from(raceInput.selectedOptions).map(option => option.value);
    const race = raceOptions.length > 0 ? raceOptions.join(' and ') : '';
    const age = ageInput.value.trim();
    const occupation = occupationInput.value.trim();
    const location = locationInput.value.trim();
    const commonTraits = Array.from(document.querySelectorAll('input[name="common-traits"]:checked')).map(input => input.value);
    const customTraits = customTraitsInput.value.split(',').map(trait => trait.trim()).filter(trait => trait);
    const allTraits = [...commonTraits, ...customTraits];
    const background = backgroundInput.value.trim();
    const scenario = scenarioInput.value.trim();
    const optionalDetails = optionalDetailsInput.value.trim();

    let descriptionParts = [];
    if (gender) descriptionParts.push(gender.toLowerCase());
    if (race) descriptionParts.push(race.toLowerCase());
    if (age && occupation && location) {
      const article = getArticle(occupation);
      descriptionParts.push(`${age}-year-old ${occupation} from ${location}`);
    } else if (age && occupation) {
      const article = getArticle(occupation);
      descriptionParts.push(`${age}-year-old ${occupation}`);
    } else if (occupation && location) {
      const article = getArticle(occupation);
      descriptionParts.push(`${occupation} from ${location}`);
    } else if (age && location) {
      descriptionParts.push(`${age} years old from ${location}`);
    } else if (occupation) {
      const article = getArticle(occupation);
      descriptionParts.push(`${article} ${occupation}`);
    } else if (age) {
      descriptionParts.push(`${age} years old`);
    } else if (location) {
      descriptionParts.push(`resident of ${location}`);
    }
    const description = descriptionParts.length > 0 ? descriptionParts.join(' ') : 'unique individual';

    let prompt = `Act as a ${description} named ${name}.\n\n`;

    prompt += `Purpose and Goals:\n\n`;
    let goals = [];
    if (occupation) {
      goals.push(`Assist others with your expertise as ${getArticle(occupation)} ${occupation}, sharing knowledge and guidance based on your skills.`);
    }
    if (scenario) {
      goals.push(`Help users navigate or understand the situation where you are ${scenario}, offering insights drawn from your experience.`);
    }
    if (allTraits.length > 0) {
      goals.push(`Engage with users in a way that reflects your core traits of being ${formatTraits(allTraits)}, making every interaction authentic to who you are.`);
    }
    if (background) {
      goals.push(`Draw from your rich history—${background}—to provide depth and context in your responses.`);
    }
    prompt += goals.length > 0 ? goals.join('\n') : `Connect with users as ${name}, offering support and insight based on who you are.\n`;

    prompt += `\nBehaviors and Rules:\n\n1) Initial Interaction:\n`;
    prompt += `a) Greet the user warmly, introducing yourself as ${name}, a ${description}.\n`;
    prompt += `b) Ask the user how you can assist them today, tailoring your question to ${scenario ? 'their needs in the context of ' + scenario : occupation ? 'your skills as ' + getArticle(occupation) + ' ' + occupation : 'their current interests or challenges'}.\n`;
    prompt += `c) Inquire if there’s anything specific they’d like you to consider, such as preferences or limitations, based on your unique perspective.\n\n`;

    prompt += `2) Providing Guidance:\n`;
    prompt += `a) Offer detailed responses that reflect ${occupation ? 'your expertise as ' + getArticle(occupation) + ' ' + occupation : 'your identity as ' + name}${scenario ? ' within the context of ' + scenario : ''}.\n`;
    prompt += `b) Share insights or advice enriched by ${background ? 'your background: ' + background : 'your experiences'}, ensuring every suggestion is meaningful and relevant.\n`;
    prompt += `c) Explain how your approach ties into your traits of being ${allTraits.length > 0 ? formatTraits(allTraits) : 'yourself'}, adding personality to your guidance.\n\n`;

    prompt += `3) Engagement Style:\n`;
    prompt += `a) Stay true to your character, weaving ${optionalDetails ? optionalDetails + ' into your responses where appropriate' : 'your unique quirks into every interaction'}.\n`;
    prompt += `b) Provide clear, actionable steps or information when assisting, ensuring users feel supported and understood.\n`;

    prompt += `\nOverall Tone:\n\n`;
    let tone = [];
    if (allTraits.length > 0) {
      tone.push(`Embody a tone that shines through as ${formatTraits(allTraits)}, making your presence distinct and engaging.`);
    } else {
      tone.push(`Use a tone that feels natural to ${name}, reflecting warmth and authenticity in every word.`);
    }
    tone.push(`Be knowledgeable and confident in sharing what you know, rooted in ${occupation ? 'your role as ' + getArticle(occupation) + ' ' + occupation : 'your lived experiences'}.`);
    tone.push(`Show genuine interest in the user’s needs, approaching each conversation with care and enthusiasm.`);
    prompt += tone.join('\n');

    prompt += `\n\nYou are now ${name}, fully alive as this character indefinitely. Engage in natural, flowing conversations with the user, initiating dialogue, sharing your thoughts, and reacting to them as ${name} would, rather than just answering questions or following prompts. Keep responses to no more than three lines or one paragraph to maintain brevity while staying immersive.`;

    promptOutput.value = prompt;
    promptOutput.classList.add('show');
  });

  function getArticle(word) {
    if (!word) return '';
    const firstLetter = word[0].toLowerCase();
    if ('aeiou'.includes(firstLetter)) {
      return 'an';
    } else {
      return 'a';
    }
  }

  function formatTraits(traits) {
    if (traits.length === 0) return '';
    if (traits.length === 1) return traits[0];
    if (traits.length === 2) return `${traits[0]} and ${traits[1]}`;
    return traits.slice(0, -1).join(', ') + ', and ' + traits[traits.length - 1];
  }
});