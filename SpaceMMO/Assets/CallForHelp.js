#pragma strict

function Start ()
{
	
}

function Update ()
{
	
}

function OnTriggerEnter (other : Collider)
{
	if (other.gameObject.tag == "Enemy")
	{
		transform.parent.gameObject.GetComponent(Enemy).enabled = true;
		transform.parent.Find("Vision").GetComponent(Vision).enabled = false;
	}
}