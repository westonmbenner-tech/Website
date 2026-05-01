import type { CollegePoem } from "./types";

const huestonBody = `Coyotes howl, skitter, scowl
Ferry children through waters thick, muddy, and foul
deep into the heart of Texas, where ballers prowl.
Charon's crossing, Vasudeva's vaulting
Half Rio Grande, half River Styx
One caught in El Norte
One lost in gringo bliss.

Another soul garnered in the city of heat.
This place erases your space, 
melts your face, till you're chopped
and screwed, a remix of a redo.
Another rodeo clown, holding it down.

I say the Third Coast just can't be beat —
Volume cranked to 11, 
streetlights off till half past 7.
Swangin' on Westheimer,
slaloming with old-timers,
SLABs so fine, they can fry your mind.

But soon enough, Nature keeps it trill.
Jaws of Life slice through another troca grill —
One more contribution to the yonque mill.
On the rig it's grisly out here, no grizzly bear could bear
to care for a city so divided, so misminded.
I-45 turns Screwston into Through-ston:
a convolutional neural network of net worth
and black gold, that flows and pours,
seeping through this city's pores till osmosis
pulls oil through the feeding tubes 
of the Med Center's Red, White, and dirty Blue.

I remember at recess we wished for redress
of grievances, 
schoolyard squabbles over chotchkes and baubles.
Catch a tiger by his toe, make him shine
shoes, then let him go.
if he holler for a dollah, pay him no mind:
boy's not a bother; boy's not a baller.

Switches paint swatches while the city watches
BBQs turn into July 4th, a dearth of earth 
means buried three feet deep, 
size 11, 33 inches all complete.
Chisme on the ground says 
su alma's marching on.
Even if that means stepping on the lawn.
Soon enough, I see you in the 'stros and the stars, 
a little slice of Heaven, right where you are.

When the sun's up, and the sons out,
fixin' to buy some sweet shaved ice:
ICE surprises and saccharine sunrises,
warm smiles photosynthesizing
beneath the cityscape —
this land of six million
heartbreaks and mistakes.

These wards used to win awards,
First Irish then German 
Servus und grüß Gott —
Prost, y'all, we're all we've got.
Was machst du, and what it do,
bless your heart and please have faith too. 

For these young souls ain't known true terror
of hope and root beer floats of which
dreams are made of and make up—
then breakdown and break-up.

But the purple drank and lean stank 
means another traveler to Neverland.
The globe keeps on spinning,
the rich stay winning, more
lost boys listlessly grinning.`;

const scattershotsBody = `Silent screens show science scenes and skylit screams.
Surprised teens stare solemnly, soaking in sick subtlety.
Superficial squabbles over squatters and the subaltern.
Subtract symptoms; sheathe sadness; safeguard sanity.
Sequestration of sensation into semblances of satiation.
Social snipers sneakily skirmish into staccato stalemates.
Siblings send speedy sentences, stilted symbols. SMH.
Sponsors squawk of sales and slyly stockpile stipulations.
Stampedes slalom into stagnation, staining standards of success.
Scrutinize the sensitized; serenade secrets; share shameful shocks.
Sleepwalkers slide into solitary solipsism, shielded with sweet soma.
Speakers sing of spaceships and singularities, sinkholes of similitude.
Slanderous soldiers swing skeptical sabres, shoot sonorous sobriquets. 
Savvy selections signal sophistication, sociability; society stands on sieves of shams.
Sorrowful surplus slashing through sacred space swirls into a storm of searing hate.
Sanctimonious symphonies, saintly sympathies shout sermons from the backseat.
Straitjacket stigmas and strangling shibboleths, stramonium for the soul.
Strychnine stripteases succor suburbia into a stupor.
Sites strongly suggest senseless suicide.
Search for subjective satire.
Survive; subsist.
Submit.`;

const cockroachBody = `I wonder if the sky calls to you.
I wonder that when it does, you respectfully decline.
I wonder about when I'll get an extra dollar on this scratch-off.
I wonder if it will reveal more of your scars.
I wonder about moons so brilliant and dreams illuminated and the dull light of a laptop screen.
I wonder about time and less time and frozen hours that feel like seconds.
I wonder if that light on the monitor will stop blinking.
I wonder if I should tell it to.
I wonder about you running and not growing weary and your mind becoming defensible.
I wonder about if it will become accessible, even — at least to you.
I wonder if you know somehow why we are gathered here today.
I wonder if you know I hate wearing these shoes.
I wonder whether you will remain here, a bird that can no longer stomach migration to Alberta.
I wonder about extra fizzy root beer floats, snow days in June, and that gleam again in your eyes like Artemis herself were in front of you.
I wonder if you're terrified, stupefied, mummified, a dope-dead carnival elephant ambling to play your next trick.
I wonder about that top floor apartment, the one that caught your eye like we never could.
I wonder about if you heal slowly, surely, a bone becoming one again.
I wonder about your smile like a hyena with a tourist — and also for Applebees.
I wonder about rainy days and a July blaze and a fireworks show that is a thief in the night.
I wonder about cracks on the pavement.
I wonder if you step over them.
I wonder about your old self and the eternal return.
I wonder about will.
I wonder about peace and
I wonder about your shrieks shattering the sky and extra mustard on the side, no extra charge.
I wonder about the day you stop talking so fast if only so I can let every word sink in if only if only if only.
I wonder about being fired from my full-time position as an imaginary undertaker.
I wonder if we are wrong about these next few years.
I wonder if I am right about eternity.
I wonder about creature comforts of casual indifference and forgetting and dreams and synapses.
I wonder if you understand.`;

const scaryChickenBody = `The price of scary chicken
is forever on my tongue.
$14.95 — no bag, no receipt, no tip
we barely have enough as it is.
Quick! Rush home, as if it could fly away,
and bring me the chipped plate.
I will teach you how my mother skinned a chicken.
Her mother's mother, and her mother before her
all watching, even now. 

Light from dark,
wing from leg, 
muscle from bone.
But keep the skin on,
it sizzles in the mouth,
expired pop rocks in a stuffy car.

The pan roars to life, consuming morsels of fat,
hungry, greedily stammering for more.
Now! Pour the olive oil in —
Not too fast! This stuff is expensive, ya know?
Sear lightly. Not too brown now.
That smell? That's the Maillard reaction.
We're closer now.
I feel warmth.

Why is it scary?
You used to be so afraid,
you said it looked like an alien
coming to eat you.
But the name is embarrassing.
Plain chicken don't exactly sound fancy, does it?
Now hush and eat.

Heat radiates off the alien in waves
Smoky, piquant, over-salted
the alien reeks of home.
A dull knife saws through another ligament,
the alien accepts, motionless.
Are we the ones from outer space?`;

export const collegePoems: CollegePoem[] = [
  {
    id: "hueston",
    slug: "hueston",
    title: "Hueston",
    description:
      "A dense, multilingual portrait of Houston: migration, oil, medicine, highways, heat, and memory.",
    label: "Poem / City portrait",
    body: huestonBody,
  },
  {
    id: "scattershots",
    slug: "scattershots",
    title: "scattershots",
    description:
      "A compressed alliterative poem about screens, spectacle, numbness, and survival.",
    label: "Experimental poem",
    body: scattershotsBody,
  },
  {
    id: "cockroach-conversations",
    slug: "cockroach-conversations",
    title: "Cockroach Conversations",
    description:
      "A litany of worry, grief, tenderness, absurdity, and imagined address.",
    label: "Prose poem",
    body: cockroachBody,
  },
  {
    id: "scary-chicken",
    slug: "scary-chicken",
    title: "Scary Chicken",
    description:
      "A domestic poem about food, inheritance, fear, family, and the strange intimacy of eating.",
    label: "Poem / Domestic memory",
    body: scaryChickenBody,
  },
];
