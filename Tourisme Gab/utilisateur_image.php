<?php
#[Route('/get-profile-image', name: 'get_profile_image', methods: ['GET'])]
public function getProfileImage(): JsonResponse
{
    $user = $this->getUser();
    if (!$user || !$user->getProfileImage()) {
        return new JsonResponse(['success' => false, 'message' => 'Aucune image trouvée']);
    }

    return new JsonResponse(['success' => true, 'imagePath' => $user->getProfileImage()]);
}


?>