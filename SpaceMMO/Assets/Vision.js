#pragma strict

function Start ()
{
	
}

function Update ()
{
	
}

function OnTriggerEnter (other : Collider)
{
	if (other.gameObject.name == "Player")
	{
		transform.parent.gameObject.GetComponent(Enemy).enabled = true;
		transform.parent.Find("CallForHelp").GetComponent(CallForHelp).enabled = true;
	}
}